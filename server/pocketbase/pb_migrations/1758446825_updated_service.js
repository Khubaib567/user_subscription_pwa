/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1892607288")

  // remove field
  collection.fields.removeById("number1295935997")

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1295935997",
    "max": 0,
    "min": 0,
    "name": "shortcode",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1892607288")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number1295935997",
    "max": null,
    "min": null,
    "name": "shortcode",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("text1295935997")

  return app.save(collection)
})
