with orders as (
    select * from {{ ref('stg_commerce__orders') }}
),

reconciled as (
    select
        order_id,
        customer_id,
        order_status,
        total_amount,
        created_at,
        updated_at,
        _loaded_at,
        case
            when order_status = 'refunded' then -total_amount
            when order_status = 'paid' then total_amount
            else 0
        end as recognized_value
    from orders
)

select * from reconciled
