class CreateConnections < ActiveRecord::Migration[6.1]
  def change
    create_table :connections do |t|
      t.boolean :accepted
      t.integer :sender_id
      t.integer :recipient_id

      t.timestamps
    end
  end
end
