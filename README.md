# Admenuensis

<sub>(a play on the word: aman-u-en-sis: a person employed to transcibe dictation.)</sub>

A React-based Content Management System (CMS) for generating and editing a restaurant's menu. It is intended to be used in combination with [servercarte](https://github.com/coquizen/gastr-backend) (a data repository API server implementation) and [Tribeca Grill](https://github.com/coquizen/restaurant-template) (a customer-facing e-commerce store).

## Features

- Create separate menus (i.e. Breakfast, Brunch, Lunch, Dinner, etc....)
- Each menu can have any number of sections (i.e. Starters, Salads, Desserts, etc...)
- Create menu items and assign them to created menus and sections.
- Ability to edit created menus, sections, and menu items.
- Drag and drop sections and menu items to reorder it's appearance on the menu.

## Screenshots

![Login Page](https://imgur.com/a/SvAskBY)
![Menu Management Screen](https://imgur.com/a/NrYA3FA)

## Run Locally

Clone the project

```bash
  git clone https://github.com/coquizen/admenuensis
```

Go to the project directory

```bash
  cd admenuensis
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Notes

- If serercarte's database was preseeded with default sample data (executed using `-s` flag), the default credentials are `admin`:`password`)
- Use Node version v14.20.0 (Fermium).

## Roadmap

- Implement scheduling capability for each menu
- Implement ability to associate add-ons and sides with each menu item
- Create an account management dashboard
- Create an overview of orders made and executed via Stripe
