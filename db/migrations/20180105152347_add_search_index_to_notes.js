
exports.up = function(knex, Promise) {
  return knex.schema
    .raw('ALTER TABLE notes ADD COLUMN "noteText" TSVECTOR')
    .raw(`UPDATE notes SET "noteText" = to_tsvector('english', title || ' ' || body)`)
    .raw(`CREATE INDEX "noteText_GIN" ON notes USING GIN("noteText")`)
    .raw(`CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE ON notes FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("noteText", 'pg_catalog.english', title, body)`);
}

exports.down = function(knex, Promise) {
  return knex.schema
    .table('notes', function (table) {
      table.dropColumn('noteText');
    })
    // .raw(`DROP INDEX public."noteText_GIN"`)
    .raw(`DROP TRIGGER tsvectorupdate on notes`)
};
