/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3745265112")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number785201689",
    "max": null,
    "min": null,
    "name": "mssidn",
    "onlyInt": false,
    "presentable": true,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3745265112")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number785201689",
    "max": null,
    "min": null,
    "name": "mssidn",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
