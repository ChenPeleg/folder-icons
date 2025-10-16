# Convert HTML file icons to JS file icons

# Description

In the file `tech/file-icons-from-site.html`, there are several file icons represented using HTML. 
Your task is to convert these HTML representations into JavaScript objects that can be used in a web application.
The structure of the html is as follows:

```html 
    <div class="icon-item astro-u2gxjkmk" data-association="{&quot;name&quot;:&quot;Vite&quot;,&quot;iconColor&quot;:&quot;#FDD835&quot;,&quot;priority&quot;:100,&quot;pattern&quot;:&quot;^vite\\.config\\.[jt]s$&quot;,&quot;fileNames&quot;:&quot;vite.config.js,vite.config.ts&quot;,&quot;icon&quot;:&quot;/icons/files/vite.svg&quot;,&quot;type&quot;:&quot;regex&quot;}" data-category="files"
         data-name="vite"
         style="display: flex;">
        <div class="icon-display astro-u2gxjkmk"><img alt="vite" class="lazy-icon astro-u2gxjkmk" data-src="/icons/icons/files/vite.svg"
                                                      height="24" width="24"></div>
        <div class="icon-name astro-u2gxjkmk">vite</div>
        <div class="icon-category astro-u2gxjkmk">files</div>
    </div>
```

```javascrip
const fileIcons = [
  {
    name: "Vite",
    iconColor: "#FDD835",
    priority: 100,
    pattern: "^vite\\.config\\.[jt]s$",
    fileNames: "vite.config.js,vite.config.ts",
    icon: "/icons/files/vite.svg",
    type: "regex"
  },
  // Add more icons here
];
```
