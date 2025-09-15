/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3745265112")

  // remove field
  collection.fields.removeById("text1597481275")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number2812057793",
    "max": null,
    "min": null,
    "name": "otp",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3745265112")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1597481275",
    "max": 0,
    "min": 0,
    "name": "token",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("number2812057793")

  return app.save(collection)
})
