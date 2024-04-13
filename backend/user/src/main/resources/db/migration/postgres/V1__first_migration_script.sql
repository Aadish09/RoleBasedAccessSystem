INSERT INTO public.actions(
	action_name, allowed_roles)
	VALUES ('update_actions', 'ADMIN') ON CONFLICT DO NOTHING;

INSERT INTO public.role(
	name, creation_date)
	VALUES ('ADMIN', NULL) ON CONFLICT DO NOTHING;

INSERT INTO public.users(
	username, password, first_name, last_name, dob, creation_date)
	VALUES ('admin','$2a$10$ex/WPC5cfPjhkUO.yCBBsu.Q.Dd4vYminjSZBG1AaJdTk/3fxtlA2','Admin','','1999-05-09','Sat Apr 13 14:55:31 IST 2024') ON CONFLICT DO NOTHING;
