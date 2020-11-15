# Input Component
Pop up that is shown with a notification

## Hooks

+ **useEffect** it's executed every time the prop "show" changes, when it's value is true, it executes the settimeout that indicates that pop should be hidden in one second, it's indicated throught the function "hidePop" that is send to it's parent

## Props
+ **copy**  String
+ **show**  Boolean
+ **hidePopUp**  Function