
-- CREATE TABLE public.event_notes (
--     event_id uuid NOT NULL,
--     note_id uuid NOT NULL
-- );

-- CREATE TABLE public.event_sources (
--     event_id uuid NOT NULL,
--     source_id uuid NOT NULL,
--     page character varying(255),
--     id uuid NOT NULL
-- );

-- CREATE TABLE public.events (
--     id uuid NOT NULL,
--     place_id uuid,
--     type character varying(4) NOT NULL,
--     date character varying(35) DEFAULT NULL::character varying,
--     date_stamp character varying(8) DEFAULT NULL::character varying,
--     is_preferred boolean NOT NULL
-- );

-- CREATE TABLE public.name_notes (
--     name_id uuid NOT NULL,
--     note_id uuid NOT NULL
-- );

-- CREATE TABLE public.name_sources (
--     name_id uuid NOT NULL,
--     source_id uuid NOT NULL
-- );

-- CREATE TABLE public.names (
--     id uuid NOT NULL,
--     person_id uuid NOT NULL,
--     personal character varying(120),
--     prefix character varying(30) DEFAULT NULL::character varying,
--     given character varying(120) DEFAULT NULL::character varying,
--     surname_prefix character varying(30) DEFAULT NULL::character varying,
--     surname character varying(120) DEFAULT NULL::character varying,
--     suffix character varying(30) DEFAULT NULL::character varying,
--     nickname character varying(30) DEFAULT NULL::character varying,
--     is_preferred boolean NOT NULL
-- );

-- CREATE TABLE public.notes (
--     id uuid NOT NULL
-- );

-- CREATE TABLE public.people (
--     id uuid NOT NULL,
--     gender character varying(1) NOT NULL
-- );

-- CREATE TABLE public.person_events (
--     person_id uuid NOT NULL,
--     event_id uuid NOT NULL
-- );

-- CREATE TABLE public.person_parents (
--     id uuid NOT NULL,
--     relationship_id uuid NOT NULL,
--     child_id uuid NOT NULL,
--     type character varying(20) NOT NULL
-- );

-- CREATE TABLE public.person_relationships (
--     person_id uuid NOT NULL,
--     relationship_id uuid NOT NULL
-- );

-- CREATE TABLE public.places (
--     id uuid NOT NULL,
--     description character varying(255) NOT NULL,
--     street character varying(255) DEFAULT NULL::character varying,
--     street2 character varying(255) DEFAULT NULL::character varying,
--     city character varying(60) DEFAULT NULL::character varying,
--     state_province character varying(60) DEFAULT NULL::character varying,
--     postal_code character varying(20) DEFAULT NULL::character varying,
--     country character varying(60) DEFAULT NULL::character varying
-- );

-- CREATE TABLE public.relationship_events (
--     relationship_id uuid NOT NULL,
--     event_id uuid NOT NULL
-- );

-- CREATE TABLE public.relationships (
--     id uuid NOT NULL
-- );

-- CREATE TABLE public.source_citations (
--     id uuid NOT NULL,
--     source_id uuid NOT NULL,
--     page character varying(255)
-- );

-- CREATE TABLE public.sources (
--     id uuid NOT NULL,
--     title character varying(255) NOT NULL,
--     author character varying(255) DEFAULT NULL::character varying,
--     publication character varying(255) DEFAULT NULL::character varying,
--     abbr character varying(60) DEFAULT NULL::character varying,
--     text text,
--     rin character varying(12) DEFAULT NULL::character varying
-- );

CREATE TABLE public.user_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token character varying(255) NOT NULL,
    expires timestamp(0) without time zone NOT NULL,
    created timestamp(0) without time zone NOT NULL
);

CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created timestamp(0) without time zone NOT NULL
);
