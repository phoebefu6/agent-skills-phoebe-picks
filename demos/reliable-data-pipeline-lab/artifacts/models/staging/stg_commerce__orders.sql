{{ config(materialized='view') }}

with source as (
    select * from {{ source('commerce', 'orders') }}
),

renamed as (
    select
        id as order_id,
        customer_id,
        lower(status) as order_status,
        amount_cents / 100.0 as total_amount,
        cast(created_at as timestamp) as created_at,
        cast(updated_at as timestamp) as updated_at,
        _loaded_at
    from source
)

select * from renamed
