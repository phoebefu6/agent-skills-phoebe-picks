{{
    config(
        materialized='incremental',
        unique_key='order_id',
        incremental_strategy='merge',
        on_schema_change='append_new_columns'
    )
}}

with orders as (
    select * from {{ ref('int_order_value') }}

    {% if is_incremental() %}
    where updated_at >= (
        select dateadd(
            hour,
            -{{ var('incremental_lookback_hours', 2) }},
            max(updated_at)
        )
        from {{ this }}
    )
    {% endif %}
)

select
    order_id,
    customer_id,
    order_status,
    total_amount,
    recognized_value,
    created_at,
    updated_at,
    current_timestamp as _published_at
from orders
