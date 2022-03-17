# React Native [Web] + Monorepo

# Table of contents

- [Used of Technologies](#used-of-technologies)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Assets](#assets)
- [Translation](#translation)
- [Theme](#theme)
- [Reusable Components](#reusable-components)
- [GraphQL CodeGen](#graphQL-codeGen)
- [Learn](#learn)
- [About Us](#about-us)

---

# Used of Technologies

1.  Monorepo - `yarn workspace`
2.  Coding styles - `TypeScript`
3.  UI styles - `styled-components`
4.  UI Framework - `AntDesign` (cms), `Tailwind` (web, mobile)
5.  Coding Practice - `Eslint` rules for `(.ts, .tsx)`
6.  API Integration - `GraphQL (with codegen)`

---

# Getting Started

1. Install dependencies `yarn install`
2. Run development server
3. Start coding

```bash
# to install dependencies
yarn
# or
yarn install
```

Available commands:

```bash

# to start `cms` development server
$ yarn dev:cms

# to start `web` development server
$ yarn dev:web

# to start `mobile` development server
$ yarn dev:mobile

# ==================
# IOS
# ==================

# to install `ios` dependencies
$ cd projects/mobile/ios && pod update && pod install && cd -

# to open project in xcode
$ yarn mobile:xcode

# to start `ios` emulator
$ yarn mobile:ios

# ==================
# Android
# ==================

# to open project in android studio
$ yarn mobile:studio

# to start android emulator
$ yarn mobile:android
```

Miscellaneous

```bash
# to generate tailwind theme config
$ yarn theme:generate

# to view tailwind theme
$ yarn theme:viewer

# to generate graphl Types, Docs, Hooks, etc
$ yarn gql:generate

# to run eslint rules check
$ yarn lint

# to fix translation locale files
$ yarn locale:fix

# to run prettier
$ yarn format

# to commit
$ yarn cz

# ======== Production Build

# execute production build for `cms` project
$ yarn build:cms

# execute production build for `web` project
$ yarn build:web

# start production server for `cms` project
$ yarn start:cms -p <PORT_NUMBER>

# start production server for `web` project
$ yarn start:web -p <PORT_NUMBER>

```

If you wish to install/remove dependencies in projects or packages, you can use command below

```bash
# to install dependencies
yarn workspace <TARGET> add <DEPENDENCIES>

# to remove dependencies
yarn workspace <TARGET> remove <DEPENDENCIES>

# to run specific script for selected packages/projects
yarn workspace <TARGET> run <SCRIPT>
```

---

## Folder Structure

```
├── packages
│   ├── common-assets # Assets files (png, jpeg, json, etc)
│   ├── common-graphql # GraphQL Types, Documents, Hooks, etc
│   ├── common-locale # Translation locale files
│   ├── ui-native # React Native UI Components
│   └── ui-theme # theme configuration accross mobile & web (cms coming soon)
└── projects
    ├── cms # cms panel
    ├── mobile # end user mobile application
    └── web # end user web application

```

---

## Assets

If you have common assets that want to shared across projects & packages, you add added thos file under folder `packages/common-assets`. Then you can import your preferred assets with below example

```TypeScript
// In react project
import logo from "@common/assets/static/logo-brand.png";

<img src={logo} />

// In react native project
import { Image } from "react-native";

const logo = require("@common/assets/static/logo-brand.png");
<Image source={logo} />

```

---

## Translation

Translation locales can be shared among `cms`, `web` & `mobile` projects under `packages/common-locale`. You can have multiple locale files (JSON) within a language folder. This monorepo has come with two languanges by default, you may refer to the folder structure below & feel free to make changes

```
└── src
     ├── cn
     │   ├── common.json
     │   └── screen.json
     └── en
         ├── common.json
         └── screen.json
```

We've provided a basic example below & this is how each JSON file should looks like.

```JSON
{

  "some-variable": "Using a variable {{message}}",
  "title": "Hello world",
  "total-items": {
    "one": "Only 1 item",
    "other": "There are {{count}} items",
    "zero": "No item"
  }
}
```

Note: Please follow the ascending order for the key (A-Z, from top to bottom). You may use `yarn locale:fix` command for the fixes automatically

### Example

For `cms` & `web` project, you may refer to the example below or checkout [next-translate](https://github.com/vinissimus/next-translate) for more information.

```TypeScript
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";

export default function SomeComponent() {
  const { t, lang } = useTranslation("common");
  const count = 3;

  return (
    <>
      <div>{t("language")}: {t(`language-${lang}`)}</div>
      <div>{t("poweredBy")}</div>
      <div>{t("some-variable", { message: "Hey" })}</div>
      <div>{t("total-items",{ count: count })</div>
      <div>{t("screen:demo.title")}</div> // <--- to use other file key with same useTranslation

      {/* Switch Language */}
      <button onPress={() => setLanguage("en")}>
        {t("language-en")}
      </button>
      <button onPress={() => setLanguage("cn")}>
        {t("language-cn")}
      </button>
    </>
  );
}
```

For `mobile` projects, you may refer to the example below & checkout [i18n-js](https://github.com/fnando/i18n-js) for more information.

```TypeScript
import { Text } from "react-native";
import { Button } from "@ui/native";
import { useTranslation } from "i18n"; // <--- always import from "i18n"

export default function SomeComponent() {
  const { t, lang, setLanguage } = useTranslation("common");
  const count = 3;

  return (
    <>
      <Text>{t("language")}: {t(`language-${lang}`)}</Text>
      <Text>{t("poweredBy")}</Text>
      <Text>{t("some-variable", { message: "Hey" })}</Text>
      <Text>{t("total-items", { count: count })}</Text>
      <Text>{t("screen:demo.title")}</Text> // <--- to use other file key with same useTranslation


      {/* Switch Language */}
      <Button onPress={() => setLanguage("en")}>
        {t("language-en")}
      </Button>
      <Button onPress={() => setLanguage("cn")}>
        {t("language-cn")}
      </Button>
    </>
  );
}
```

If you've noticed, the interface for the translation actually is quite similar for both `react` & `react-native` projects. But there are certains thing you guys have to take note

1. In `react-native` project (mobile) always import from `i18n`.
2. In `react` projects (web, cms) always import from `next-translate`.
3. To switch language in `react` & `react-native` can always use `setLanguage` method. But there is some differences on implementation. Please checkout the example below:

```TypeScript
// in react project (web & cms)
import setLanguage from "next-translate/setLanguage";

setLanguage("en"); // within component

// in react-native project (mobile)
import { useTranslation } from "i18n";

const { t, lang, setLanguage } = useTranslation(); // within component
setLanguage("en")
```

You can check the table for

| Variable/Function        | Description                       | Web & CMS                                                                             | Mobile                                                       |
| ------------------------ | --------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `t` (function)           | A function to get translated text | access via `useTranslation` react hooks (import from `next-translate/useTranslation`) | access via `useTranslation` react hooks (import from `i18n`) |
| `lang` (string)          | Current language                  | Same as above                                                                         | Same as above                                                |
| `setLanguage` (function) | A function for language switching | import from `next-translate/setLanguage`                                              | Same as above                                                |

---

## Theme

This monorepo enable theme configuration accross packages & projects. There were predefined setting under `packages/ui-theme` folder and below the folder structure

```
├── src
│   ├── config # constant values
│   │   ├── colors
│   │   ├── palette
│   │   └── spacing
│   └── tailwind # helper function for get tailwind styles with css name
├── styles.json # tailwind styles for react native
└── tailwind.config.js # tailwind configuration
```

For minimal usage, just modify constant values for ` colors`, `palatte`, `spacing` under `config` folder and you can access the value by importing the package. For example

```TypeScript
import { colors, palette, spacing } from "@ui/theme";

colors.primary // primary color
palette.black // black color

spacing.scale.sm // xs, sm, md, lg, xl, xxl
spacing.unit // px, rem, em

```

For advanced usage, please refer to upcoming section for Tailwind & Ant Design

### Tailwind

For tailwind theme configuration, you may update the `tailwind.config.js` under `packages/ui-theme` folder. The configuration will be shared accross `mobile` and `web` or other project that enable tailwind.

If you wish to have advanced configuration, please checkout the [official documentation](https://tailwindcss.com/docs/configuration) for customization.

**Note**: You can always run `yarn theme:viewer` to view theme configuration.

#### Example

To apply tailwind style for `react` or `react-native` project, you can do something like below:

```TypeScript
// in react-native project use with `@ui/theme` for styling
import { View } from "react-native";
import { Text } from "@ui/native";
import { tw } from "@ui/theme";

<View style={tw("bg-primary")}>
  <Text>View with primary color background</Text>
</View>

// if you are working on react project, just do as simple like below
<div className="bg-primary">
  View with primary color background
</div>
```

##### Caveat:

1. There are limited css classname supported for `React Native`, you can checkout this [repo](https://github.com/vadimdemedes/tailwind-rn#supported-utilities) for more information
2. Whenever there is a new update on `tailwind.config.js`, please remember to run `yarn theme:generate` in order apply changes on `React Native`

### Ant Design

For Ant.Design theme configuration, you may update the `custom.less` under `projects/cms/styles` folder. Please refer to this [reference](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less) if you need to overwrite the default styles.

---

## Reusable Components

In this skeleton there were few reusable components that created to be shared accross web & mobile project in purpose. There will be components added to this skeleton from time to time, please stay tuned and at the meantime you may check below section for existing component documentation

1. `Screen` - [documentation](./packages/ui-native/src/components/Screen/README.md)
2. `Button` - [documentation](./packages/ui-native/src/components/Button/README.md)
3. `Text` - [documentation](./packages/ui-native/src/components/Text/README.md)
4. `TextInput` - [documentation](./packages/ui-native/src/components/TextInput/README.md)
5. `LoginView` - [documentation](./packages/ui-native/src/components/Form/LoginView/README.md)

**Note: You may check `@ui/native` (packages/ui-native) packages for more information**

---

## GraphQL CodeGen

First step is change the schema url to your development server at `./packages/common-graphql/.codegen.yml`

```yml
schema: "http://localhost:3000/graphql"
```

Second step find the operations file at `./packages/common-graphql/src/operations/index.graphql` and modify it, for example

```GraphQL
fragment UserInfo on User {
  id
  email
  firstName
  lastName
  phoneCode
  phoneNumber
  referralCode
}

query getAuthProfile {
  getAuthProfile {
    ...UserInfo
  }
}
```

Third Step is to generate the GraphQL Types, Documents, Hooks by running the command `yarn gql:generate`
![GraphQL Codegen](./docs/gql-generate.gif)

Fourth Step is to import any of Types, Documents, Hooks to your components or the places you wants to use it

```js
// example from src/config/getAuthProfile.ts
import get from "lodash/get";
import { GetAuthProfileDocument } from "@common/graphql";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export default (
  apolloClient: ApolloClient<NormalizedCacheObject>
): Promise<{ authUser: any }> => {
  return apolloClient
    .query({
      query: GetAuthProfileDocument
    })
    .then(({ data }) => {
      const authUser = get(data, "getAuthProfile", null);
      return { authUser };
    })
    .catch(() => {
      // Fail gracefully
      return { authUser: null };
    });
};
```

---

# Learn

### React Native

A framework for building native apps using React. For more information please checkout [official documentation](https://reactnative.dev/)

### Ant Design

An enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises. For more infomation please checkout the [official documentation](https://ant.design/components/overview/).

### Tailwind Css

A utility-first CSS framework for rapid UI development. For more infomation & details please checkout the [official documentation](https://tailwindcss.com/docs).

Oh Wait! There are some awesome references for UI components as well

1. https://tailwindui.com/components
2. https://tailblocks.cc/
3. https://tailwindtemplates.io/
4. https://component.tailwindow.com/
5. https://www.tailwindtoolbox.com/
6. https://tailwindcomponents.com/

### Styled Component

1. Official Docs - https://styled-components.com/
2. Github - https://github.com/styled-components/styled-components

---

# About

Doc created by LASIYA PRIYAN