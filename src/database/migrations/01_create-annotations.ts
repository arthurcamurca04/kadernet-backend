import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('annotations', table =>{
        table.increments('id').primary();
        table.string('title').notNullable();
        table.decimal('value').notNullable();
        table.boolean('isToReceive').notNullable();
        table.date('date').notNullable();
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

    })
}

export async function down(knex: Knex){
    knex.schema.dropTable('annotations');
}