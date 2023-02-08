class CreateConnections < ActiveRecord::Migration[6.1]
  def change
    create_table :connections do |t|
      t.boolean :accepted, :default => false
      t.integer :sender_id
      t.integer :recipient_id

      t.timestamps
    end
  end
end
