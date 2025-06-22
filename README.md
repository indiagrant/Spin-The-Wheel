# SpinTheWheel

Small Spin-The-Wheel application built in Angular and TypeScript with dynamic segments and custom components.

## Development server

To start the app locally:

```bash
ng serve
```

or

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## Results Display Options

There are two ways to view the results after spinning the wheel:

1. Default (Navigation to Results Page):
   After the wheel finishes spinning, the application navigates to a separate /results page to display the outcome. This approach was implemented to meet initial requirements.

2. Optional (Dialog Window):
   For a smoother and (ever so slightly) more fun user experience, I have also built a dialog window component to view results.

### How to Switch Between Views

In shared/spinner/spinner.ts, modify the spinWheel() and spinToTargetSegment() methods:

👉 To Use the Dialog View:

Uncomment the dialogService.openDialog(...) block.

Comment out the router.navigate(...) block.

👉 To Use the Navigation View (Default):

Comment out the dialogService.openDialog(...) block.

Uncomment the router.navigate(...) block.

## Development Journey

This app was built iteratively, prioritising simplicity first and adding complexity gradually.

✅ What Went Well

Component architecture: Broke down functionality into clean, reusable Angular standalone components using signals.

Iterative development: Started with a hardcoded version of the wheel to quickly validate concept. Gradually moved to a dynamic version with user-defined inputs and result handling.

🧩 What Was Challenging

Wheel segment layout: Calculating correct angles for dynamic segments took more debugging than expected. After testing several approaches, the most effective solution was to use the HTML < canvas > element.

Spin mechanics: Both random and pre-determined spins work inconsistently — final segment landing logic needs refinement.

📈 Ideas for Future Improvements

Debug and fix spin rotation calculations.

Enforce a max character limit on labels for better layout consistency.

Introduce dynamic colour assignment to segments for better UX.
