/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3745265112")

  // update collection data
  unmarshal({
    "name": "subscriber"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3745265112")

  // update collection data
  unmarshal({
    "name": "subscribers"
  }, collection)

  return app.save(collection)
})
