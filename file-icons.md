# Find file icons that could be used with ts or tsx extention

# steps:
1. look at the file :
`file-icons/file-icons.js` - done

2. Search for icons that could be used for ts or tsx files - done
3. list in this md file the relevant icons and their  icon type, and there regex - done
4. add each of this files to the `file-icons` folder in this repo, the content of the file could just be a comment with
`// icon: <icon-type>`  
5. look in the `file-icons` folder. if two files have the same icon type put onlt the first one. otherwise delete the file

# found:

## Primary TypeScript Icons

### 1. ts-icon
- **Colors**: ["medium-blue","medium-blue"]
- **Regex**: `/\.[cm]?ts$/i`
- **Description**: Main TypeScript icon for .ts, .cts, and .mts files
- **Language Scope**: `/\.ts$/i`
- **Language Names**: `/^(?:ts|Type[-\s]*Script)$/i`
- **Interpreter**: `/\b(?:deno|tsc|ts-node)$/`

### 2. tsx-icon
- **Colors**: ["light-blue","light-blue"]
- **Regex**: `/\.tsx$/i`
- **Description**: TypeScript React icon for .tsx files
- **Language Scope**: `/(?:^|\.)(?:TSX|TypeScript[-_ ]?React)(?:$|\.)/i`
- **Language Names**: `/^TSX$/i`

## Config/Settings Icons for TypeScript

### 3. config-ts-icon (tsconfig)
- **Colors**: ["medium-blue","dark-blue"]
- **Regex**: `/^tsconfig(?:\..+)?\.json$/i`
- **Priority**: 1.5
- **Description**: TypeScript configuration files (tsconfig.json, tsconfig.base.json, etc.)

### 4. config-ts-icon (tslint)
- **Colors**: ["medium-purple","dark-purple"]
- **Regex**: `/^tslint\.json$/i`
- **Priority**: 1.5
- **Description**: TSLint configuration file

## Test Files Icons for TypeScript

### 5. test-ts-icon (test .ts)
- **Colors**: ["medium-blue","dark-blue"]
- **Regex**: `/(?:^test[._-].*|[._-](?:spec|test)s?)\.ts$/i`
- **Priority**: 1.5
- **Description**: TypeScript test files (test.ts, spec.ts, etc.)

### 6. test-ts-icon (test .tsx)
- **Colors**: ["light-blue","medium-blue"]
- **Regex**: `/(?:^test[._-].*|[._-](?:spec|test)s?)\.tsx$/i`
- **Priority**: 1.5
- **Description**: TypeScript React test files (test.tsx, spec.tsx, etc.)

### 7. test-ts-icon (path-based .ts)
- **Colors**: ["medium-blue","dark-blue"]
- **Regex**: `/([\\\/])(spec|test)s?\1(?:\d+[-.])+(?!-)[^.\\\/]+\.ts$/i`
- **Priority**: 1.5
- **Path Sensitive**: true
- **Description**: TypeScript test files in spec/test folders

### 8. test-ts-icon (path-based .tsx)
- **Colors**: ["light-blue","medium-blue"]
- **Regex**: `/([\\\/])(spec|test)s?\1(?:\d+[-.])+(?!-)[^.\\\/]+\.tsx$/i`
- **Priority**: 1.5
- **Path Sensitive**: true
- **Description**: TypeScript React test files in spec/test folders

## Build Tool Icons (TypeScript variants)

### 9. brunch-icon (TypeScript)
- **Colors**: ["medium-green","medium-green"]
- **Regex**: `/^brunch-config\.(?:[cm]?js|coffee|ts)$/i`
- **Priority**: 2
- **Description**: Brunch configuration files in TypeScript

### 10. grunt-icon (TypeScript)
- **Colors**: ["medium-blue","medium-blue"]
- **Regex**: `/^gruntfile.*\.tsx?$/i`
- **Priority**: 2
- **Description**: Grunt configuration files in TypeScript

### 11. gulp-icon (TypeScript)
- **Colors**: ["medium-blue","medium-blue"]
- **Regex**: `/^gulpfile.*\.tsx?$/i`
- **Priority**: 2
- **Description**: Gulp configuration files in TypeScript

### 12. karma-icon (TypeScript)
- **Colors**: ["medium-cyan","medium-cyan"]
- **Regex**: `/^karma\.conf(?:ig)?\.[cm]?js$|^karma\.conf(?:ig)?\.ts$/i`
- **Priority**: 2
- **Description**: Karma test runner configuration in TypeScript

## Storybook Icons (TypeScript variants)

### 13. storybook-icon (TypeScript)
- **Colors**: ["medium-blue","medium-blue"]
- **Regex**: `/\.(?:story|stories)\.tsx?$/i`
- **Priority**: 2
- **Description**: Storybook story files in TypeScript/TSX

## Styled Components Icons (TypeScript variants)

### 14. nailpolish-icon (.sc.ts)
- **Colors**: ["medium-blue","medium-blue"]
- **Regex**: `/\.sc\.ts$/i`
- **Priority**: 2
- **Description**: Styled components in TypeScript

### 15. nailpolish-icon (.sc.tsx)
- **Colors**: ["light-blue","light-blue"]
- **Regex**: `/\.sc\.tsx$/i`
- **Priority**: 2
- **Description**: Styled components in TypeScript React

## Other Config Files

### 16. snowpack-icon (TypeScript config)
- **Colors**: ["dark-blue","dark-blue"]
- **Regex**: `/^snowpack\.config\.(?:[cm]?js|ts|json)$/i`
- **Priority**: 2
- **Description**: Snowpack configuration in TypeScript

### 17. stitches-icon (TypeScript config)
- **Colors**: ["medium-purple","medium-purple"]
- **Regex**: `/^\.?stitches\.config\.(?:[cm]?js|ts)$/i`
- **Priority**: 2
- **Description**: Stitches CSS-in-JS configuration in TypeScript

### 18. quasar-icon (TypeScript config)
- **Colors**: ["medium-blue","medium-blue"]
- **Regex**: `/^quasar\.conf(?:ig)?\.[cm]?[jt]s$/i`
- **Priority**: 2
- **Description**: Quasar framework configuration in TypeScript

### 19. gridsome-icon (TypeScript config)
- **Colors**: ["medium-cyan","medium-cyan"]
- **Regex**: `/\bgridsome\.(?:config|client|server)\.[jt]s$/i`
- **Priority**: 2
- **Description**: Gridsome configuration files in TypeScript
