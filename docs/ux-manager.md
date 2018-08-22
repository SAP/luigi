# UX Manager

Use the UX Manager to manage the appearance in Luigi.   

Here is a code sample and a definition of the different parameters:

````
LuigiClient.uxManager().addBackdrop()
LuigiClient.uxManager().removeBackdrop()
````

- **addBackdrop()** adds a backdrop to block the top and side navigation. It is based on Fundamental UI Modal, which you can use in your micro front-end to achieve the same behaviour.
- **removeBackdrop()** removes the backdrop.