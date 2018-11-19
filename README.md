# React Hooks Invite Site

## Purpose

This site is to build a Birthday Event site, experiment with the new React Hooks and brush up on my node express mongo skills. 

(https://link.medium.com/LkHzyqhbOR)[Hooks by Carl Vitullo ]

## Passing function up to the modal from Uploader Pattern

I wanted my modal to be a custom component that could be activated by passing a `setModal` function. The problem is that the confirm button needs to take a function so you can pass that up too, but then you can set a loading state for the component that you passing it from... you can have it in the modal I spose, but its not perfect as in this project i have some long server requests (from my free services) and I'd really like to put the component into a loading state instead. 
Perhaps giving the modal Context is the answer here... of course given the size of the app there's way easier options, the point here is really to come up with a solution that will scale. 


## Suspense

To use Suspense you need to pass the React's strict mode. To enable this wrapo the `<App/>`component like such `<React.StrictMode><App/></React.StrictMode>`, now you will recieve the the non-passing issues as console.error's.

I'm not sure how this will effect Suspense in files that do pass strict mode, so i'll give it a go. but I imagine that starting to use it in a app that does  not pass strict mode could a risky venture... maybe.

IT WAS RISKY!! weird stuff happened as when the gallery and messages component were nested in  React.StrictMode error'd components _(Material-UI)_ only some of the items being maps from the images  and message array.

..

## Hooks

### Drawbacks

- State wont recursively merge.

  .