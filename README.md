# React Hooks Invite Site

## Purpose

This site is to build a Birthday Event site, experiment with the new React Hooks and brush up on my node express mongo skills. 

(https://link.medium.com/LkHzyqhbOR)[Hooks by Carl Vitullo ]

## Passing function up to the modal from Uploader Pattern


## Suspense

To use Suspense you need to pass the React's strict mode. To enable this wrapo the `<App/>`component like such `<React.StrictMode><App/></React.StrictMode>`, now you will recieve the the non-passing issues as console.error's.

I'm not sure how this will effect Suspense in files that do pass strict mode, so i'll give it a go. but I imagine that starting to use it in a app that does  not pass strict mode could a risky venture... maybe.

IT WAS RISKY!! weird stuff happened as when the gallery and messages component were nested in  React.StrictMode error'd components _(Material-UI)_ only some of the items being maps from the images  and message array.

..

## Hooks

### Drawbacks

- State wont recursively merge.

  .