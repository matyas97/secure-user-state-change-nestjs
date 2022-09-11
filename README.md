## Secure users identity verification state change in NestJS
When I was creating internal logic for real estate investment platform [ROIER]([url](https://www.roier.cz)), I needed to handle user identity verification, which we splitted in multiple steps in our client app. To save the process after each step, so the user doesn't have to start again on page refresh or leaving the site, I created those states for the verificaiton session:

<img width="248" alt="image" src="https://user-images.githubusercontent.com/59233911/189513757-087882dc-f2c0-44ee-95a7-9a9c62bef4cf.png">

For creating and changing the verification session I defined multiple enpoints, so the client app calls each one as the user goes through the process. It works fine but It has one flaw. **How to secure those endpoints so the malicious user can't jump from e.g. state FILLED_PERSONAL_INFO to SIGNED?** We need the user to go through each of those steps, not jump to the end and have us without the data we need.

To solve this I started with creating simple Map object, which defines the sequence of states in which the verification session should be updated:

<img width="564" alt="image" src="https://user-images.githubusercontent.com/59233911/189514058-62775982-a359-4322-9d1a-ad5b54e84373.png">

Next I wired up this map object in NestJS [guard](https://docs.nestjs.com/guards) in a way it gets the current verification state and from it the "allowed" state from the Map object and compares it to the requested state.

<img width="643" alt="image" src="https://user-images.githubusercontent.com/59233911/189514230-5dc0f1cd-37c6-4876-adc7-1b732b7caa7a.png">

The requested state, which is needed for this guard to work, comes from [SetMetadata decorator](https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata), which is implemented like so:

<img width="485" alt="image" src="https://user-images.githubusercontent.com/59233911/189514296-e39e5f39-4cfb-47e3-b85d-348d86eeaf6f.png">

In plain english the SetMetadata decorator tells the guard below "this is the state I want to change on request to this endpoint" and the guard responds with "nah, current state of the verification session can't be updated to the state you are requesting" or with "yep, go on".

The code in this repository is only for the purposes of showing the example solution to this specific use case. I skipped the whole user authentication and actual business logic so copying won't work. I hope it inspires you to come up with own solution to securely chaning the state of some data.

---
P.S.
Feedback welcome 🤓. Support NestJS!

<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
