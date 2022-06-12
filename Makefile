serve:
	npm run dev

migrate:
	npx prisma dev

generate:
	npx prisma generate

setup_db:
	npx prisma migrate dev && npm run seed

seed:
	npm run seed