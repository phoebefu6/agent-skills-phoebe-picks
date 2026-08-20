# Proof to Action Lab Tracking Plan

Last updated: 2026-08-13

## Measurement contract

- Primary decision: Which page message and placement lead a visitor to request a proof artifact?
- Primary conversion: `artifact_requested`, counted once per CTA interaction in the local demo; a production implementation should deduplicate accidental rapid repeats.
- Supporting signals: method exploration, objection exploration, and downstream gallery or source intent.
- Tools: local `dataLayer` demonstration only. No GA4 or GTM container is connected.
- Privacy: optional events require explicit local demo consent; no email, name, account ID, IP address, or other PII is collected.

## Events

| Event | Properties | Trigger | Decision |
| --- | --- | --- | --- |
| `page_viewed` | page, content_group, source, medium, campaign, content | Consent granted | Evaluate qualified traffic mix |
| `cta_clicked` | cta_text, cta_location, campaign context | Primary CTA click | Compare message placement |
| `method_link_clicked` | link_location, campaign context | Method explainer link | Assess need for process detail |
| `faq_opened` | faq_id, campaign context | First open per FAQ | Rank objections |
| `artifact_requested` | cta_location, campaign context | CTA resolves | Primary conversion |
| `outbound_link_clicked` | destination_type, campaign context | Gallery/source exit | Measure downstream intent |

## UTM convention

Use lowercase values and underscores consistently:

`?utm_source=linkedin&utm_medium=social&utm_campaign=skill_proof&utm_content=contrarian_hook`

UTMs describe the most recent tagged arrival. They do not establish causal attribution.

## Production validation

Before connecting GA4 or GTM, confirm correct triggers and values, no duplicates, consent behavior, mobile and cross-browser operation, conversion counting, internal-traffic exclusion, data retention, and absence of PII. Publish GTM changes through a named version with review notes.
