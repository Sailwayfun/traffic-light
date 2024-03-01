# traffic-light

This is a project exploring how React and Vue deal with side effects differently.

## React
In React, effects are run in a callback of the hook useEffect. The useEffect hook is run when a component is mounted to the DOM, and anytime a dependency listed in the second argument changes.

Also, the current light state needs to be run when a side effect is run, so useEffect must deal with state updates, too.

setTimeout returns a timer that should be clear when the component is unmounted, that is, just before every next render. So useEffect should return a function that clears side effects.

## Vue
In Vue, states are tracked by the ref function. Different from React, the setter of the state can be written in the script as a normal function. Also, Vue allows a mutable approach to writing the setter function, making code logic leaner.
However, it's quite cumbersome if you want to use variables from the template in the script. So Vue provides v-bind, to allow native HTML attribute to be extended by Vue attributes.
The watchEffect API of the composition API is quite similar to React's useEffect, except it automatically traces any reactive value inside the callback, so developers won't need to pass in dependencies.
There's a caveat. If you choose to use the watch function, it won't run until the component finished mounting, which means the setTimeout won't fire at all, unless you manually set it in the onMounted hook. However, I think the watchEffect API is a much cleaner way to deal with this kind of effect that cycles indefinitely.

The project is a challenge on GreatFrontEnd.