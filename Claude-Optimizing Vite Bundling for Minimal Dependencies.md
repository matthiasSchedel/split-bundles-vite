# Claude Conversation

## Prompt:
help me setup a vite repo that achieves the following
setup a repo with two script tags that are build in two different bundles both script tag have different deps once more the other less
I want to setup the build process in a way where each bundle only gets the modules included in the build which he is actually requiring
start from scratch using typescript and vite
--
for reference the build js and vite config js I use in my production product (maybe you can tell me where I'm going wrong here)


the functionality in the bundles should not be any UI elements but rather event processing and sending (e.g. one bundle sends meta pixel events the other one does send TikTok pixel events) both share the same base logic while the meta event logic also does require the shared hashing functions to hash the payload

the goal is to figure out the correct build settings that we only include the really required build sizes

while also note requiring tyoe=module when loading 

see the reference files which are currently used in the prod project

## Response:
 I'll help you set up a Vite repository with two separate bundles that each include only the modules they need. From your description, you want to optimize bundle sizes while ensuring that shared code is properly handled, all without requiring `type="module"` when loading them.

Let's start from scratch and build this step by step.

## Understanding the Goal

Based on your description, you need:
1. Two separate bundles (Meta pixel events and TikTok pixel events)
2. Shared base logic between them
3. Additional hashing functions only for the Meta events bundle
4. Tree-shaking to ensure each bundle only includes what it needs
5. Output format that doesn't require `type="module"` when loading

Looking at your reference files, I see you're using Vite with various plugins for tree-shaking, visualization, and bundling, along with a custom build script that processes both source and destination bundles.

## Project Setup

Let's create a new project with the proper structure:
```
Viewing artifacts created via the Analysis Tool web feature preview isn’t yet supported on mobile.
```



Now, let's create the basic configuration files:
```
Viewing artifacts created via the Analysis Tool web feature preview isn’t yet supported on mobile.
```


```
Viewing artifacts created via the Analysis Tool web feature preview isn’t yet supported on mobile.
```



Now let's create the Vite configuration file that will be used for building:
```
Viewing artifacts created via the Analysis Tool web feature preview isn’t yet supported on mobile.
```



Now let's create the build script that will handle creating separate bundles:
```
Viewing artifacts created via the Analysis Tool web feature preview isn’t yet supported on mobile.
```





Now let's create the source files for our shared logic, Meta pixel, and TikTok pixel:
```
Viewing artifacts created via the Analysis Tool web feature preview isn’t yet supported on mobile.
```


```
Viewing artifacts created via the Analysis Tool web feature preview isn’t yet supported on mobile.
```


```
Viewing artifacts created via the Analysis Tool web feature preview isn’t yet supported on mobile.
```


```
Viewing artifacts created via the Analysis Tool web feature preview isn’t yet supported on mobile.
```


```
Viewing artifacts created via the Analysis Tool web feature preview isn’t yet supported on mobile.
```


```
Viewing artifacts created via the Analysis Tool web feature preview isn’t yet supported on mobile.
```


```
Viewing artifacts created via the Analysis Tool web feature preview isn’t yet supported on mobile.
```



Finally, let's create a simple HTML file to demonstrate how to use the bundles:
```
Viewing artifacts created via the Analysis Tool web feature preview isn’t yet supported on mobile.
```





Now let's provide a README with instructions on how this setup works:
```
Viewing artifacts created via the Analysis Tool web feature preview isn’t yet supported on mobile.
```




---
Powered by [Claude Exporter](https://www.claudexporter.com)