class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.text :bio
      t.string :password_digest
      t.string :email
      t.string :location
      t.string :gender
      t.integer :age

      t.timestamps
    end
  end
end
