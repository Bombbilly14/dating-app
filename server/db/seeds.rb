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

    u1 = User.create(name: 'billy', age: 30, password: 'password', email: 'billy@example.com', location: "nowhere", gender: 'He/Him', gender_preference: ['She/Her', 'They/Them'])
    u2 = User.create(name: 'Ian', age: 21, password: 'password', email: 'ian@example.com', location: "LV", gender: 'He/Him')
    u3 = User.create(name: 'jason', age: 25, password: 'password', email: 'jason@example.com', location: "Irvine", gender: 'He/Him')
    u4 = User.create(name: 'keith', age: 26, password: 'password', email: 'keith@example.com', location: "Somewhere S CA", gender: 'He/Him')
    u7 = User.create(name: 'Tennifer', age: 26, password: 'password', email: 'Tennifer@example.com', location: "Eagleton", gender: 'She/Her')
    u8 = User.create(name: 'April', age: 26, password: 'password', email: 'april@example.com', location: "Somewhere fancy", gender: 'She/Her')
    u9 = User.create(name: 'Vanessa', age: 26, password: 'password', email: 'vanessa@example.com', location: "nowhere S CA", gender: 'She/Her')
    u5 = User.create(name: 'Ix', age: 26, password: 'password', email: 'ix@example.com', location: "Somewhere", gender: 'They/Them')
    u6 = User.create(name: 'Bobert', age: 26, password: 'password', email: 'bobert@example.com', location: "seeds r hard", gender: 'He/Him')
    u10 = User.create(name: 'John', age: 26, password: 'password', email: 'john@example.com', location: "ok last place", gender: 'He/Him')

    c1 = Connection.create(accepted: true, sender_id: u1.id, recipient_id: u7.id)
    c2 = Connection.create(accepted: true, sender_id: u7.id, recipient_id: u4.id)



    # m1 =Message.create!(
    #     sender_id: u1.id,
    #     recipient_id: u2.id,
    #     body: "Hello, how are you?"
    #   )

    # m2 =Message.create!(
    #     sender_id: u2.id,
    #     recipient_id: u1.id,
    #     body: "not bad, thanks"
    #   )
     


    puts "🌱 Seeding Done!"