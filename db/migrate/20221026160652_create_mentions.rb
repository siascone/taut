class CreateMentions < ActiveRecord::Migration[7.0]
  def change
    create_table :mentions do |t|
      t.integer "user_id", null: false
      t.integer "message_id", null: false
      t.boolean "read", null: false
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.index ["user_id", "message_id"], name: "index_mentions_on_user_id_and_message_id", unique: true
    end
  end
end
