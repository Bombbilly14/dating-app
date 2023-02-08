# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Message.destroy_all
Connection.destroy_all



    puts "🌱 Seeding data..." 

    u1 = User.create(name: 'billy', age: 30, password: 'password', email: 'billy@example.com', location: "nowhere", gender: 'theym')
    u2 = User.create(name: 'morgan', age: 21, password: 'password', email: 'morgan@example.com', location: "LV", gender: 'itsaboy')
    u3 = User.create(name: 'jason', age: 25, password: 'password', email: 'jason@example.com', location: "Irvine", gender: 'ladyboy')
    u4 = User.create(name: 'keith', age: 26, password: 'password', email: 'keith@example.com', location: "Somewhere S CA", gender: 'boylady')
    u7 = User.create(name: 'Tennifer', age: 26, password: 'password', email: 'keith@example.com', location: "Eagleton", gender: 'F')
    u8 = User.create(name: 'Barbara', age: 26, password: 'password', email: 'keith@example.com', location: "Somewhere fancy", gender: 'M')
    u9 = User.create(name: 'Sue', age: 26, password: 'password', email: 'keith@example.com', location: "nowhere S CA", gender: 'F')
    u5 = User.create(name: 'Ix', age: 26, password: 'password', email: 'keith@example.com', location: "Somewhere", gender: 'Z')
    u6 = User.create(name: 'keith2', age: 26, password: 'password', email: 'keith@example.com', location: "seeds r hard", gender: 'they/them')
    u10 = User.create(name: 'keith3', age: 26, password: 'password', email: 'keith@example.com', location: "ok last place", gender: 'fem')

    c1 = Connection.create(accepted: true, sender_id: u1.id, recipient_id: u2.id)
    c2 = Connection.create(accepted: true, sender_id: u7.id, recipient_id: u4.id)



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