/** @format */

export const fetchSections = () => fetch('/sections').then.json()

export const fetchSectionByID = (id) => fetch(`/sections/${id}`).then.json()

export const fetchItemByID = (id) => fetch(`/sections/${id}`).then.json()
