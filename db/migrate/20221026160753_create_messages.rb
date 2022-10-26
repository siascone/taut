class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.integer "author_id", null: false
      t.integer "room_id", null: false
      t.text "body", null: false
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.index ["author_id"], name: "index_messages_on_author_id"
      t.index ["room_id"], name: "index_messages_on_room_id"
    end
  end
end
