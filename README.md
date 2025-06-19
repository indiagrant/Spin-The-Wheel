# SpinTheWheel

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

or

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## Building

To build the project run:

```bash
ng build
```

or

```bash
npm run build
```

## Important notes

There are two ways to view the results after spinning the wheel:

1. Default (Navigation to Results Page)
   After the wheel finishes spinning, the application navigates to a separate /results page to display the outcome. This approach was implemented to meet initial requirements.

2. Optional (Dialog Window)
   For a smoother and (ever so slightly) more fun user experience, I have also built a dialog window component to view results.

## How to Switch Between Views

To switch between the two result-view modes, update the spinWheel() and spinToTargetSegment() methods in shared/wheel/wheel.ts:

To Use the Dialog View:
Uncomment the dialogService.openDialog(...) block.

Comment out the router.navigate(...) block.

To Use the Navigation View (Default):
Comment out the dialogService.openDialog(...) block.

Uncomment the router.navigate(...) block.
