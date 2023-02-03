# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Message.destroy_all



    puts "🌱 Seeding data..." 

    u1 = User.create(name: 'billy', age: 30, password: 'password', email: 'billy@example.com', location: "nowhere", gender: 'theym')
    u2 = User.create(name: 'morgan', age: 21, password: 'password', email: 'morgan@example.com', location: "LV", gender: 'itsaboy')
    u3 = User.create(name: 'jason', age: 25, password: 'password', email: 'jason@example.com', location: "Irvine", gender: 'ladyboy')
    u4 = User.create(name: 'keith', age: 26, password: 'password', email: 'keith@example.com', location: "Somewhere S CA", gender: 'boylady')



    m1 =Message.create!(
        sender_id: u1.id,
        recipient_id: u2.id,
        body: "Hello, how are you?"
      )

    m2 =Message.create!(
        sender_id: u2.id,
        recipient_id: u1.id,
        body: "not bad, thanks"
      )
     


    puts "🌱 Seeding Done!"