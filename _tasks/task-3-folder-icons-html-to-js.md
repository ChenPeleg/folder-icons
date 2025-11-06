// filepath: c:\Projects\folder-icons\_tasks\task-3-folder-icons-html-to-js.md
# Convert HTML folder icons to JS folder icons

# Description

In the file `tech/folders/folder-icons-as-html-from-site.html`, there are several folder icons represented using HTML. 
Your task is to convert these HTML representations into JavaScript objects that can be used in a web application.
The structure of the html is as follows:

```html 
    <div class="icon-item astro-u2gxjkmk" data-association="{&quot;name&quot;:&quot;Node Modules&quot;,&quot;iconColor&quot;:&quot;#8BC34A&quot;,&quot;priority&quot;:50,&quot;pattern&quot;:&quot;^node_modules$&quot;,&quot;folderNames&quot;:&quot;node_modules&quot;,&quot;icon&quot;:&quot;/icons/folders/node_modules.svg&quot;,&quot;type&quot;:&quot;exact&quot;}" data-category="folders"
         data-name="node_modules"
         style="display: flex;">
        <div class="icon-display astro-u2gxjkmk"><img alt="node_modules" class="lazy-icon astro-u2gxjkmk" data-src="/icons/icons/folders/node_modules.svg"
                                                      height="24" width="24"></div>
        <div class="icon-name astro-u2gxjkmk">node_modules</div>
        <div class="icon-category astro-u2gxjkmk">folders</div>
    </div>
```

```javascrip
const folderIcons = [
  {
    order : 1
    name: "Node Modules", 
    pattern: "^node_modules$",
    folderNames: "node_modules",
    icon: "/icons/folders/node_modules.svg",
    type: "exact"
  },
  // Add more icons here
];
```

