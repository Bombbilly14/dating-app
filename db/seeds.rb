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
    u2 = User.create(name: 'asd', age: 2, password: 'password', email: 'dfff@example.com', location: "aaaa", gender: 'itsaboy')

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