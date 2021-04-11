# PhxChat

Install Elixir if you don't have:

  * Run `brew install elixir` for Mac users

Create a secret file for configuration:

  * create `config/dev.secret.exs` file and write down your secret configuration in that file.

 	```
	# config/dev.secret.exs
	use Mix.Config
	
	# Configure your database
	config :phx_chat, PhxChat.Repo,
	  username: "your_user_name",
	  password: "your_password",
	  database: "phx_chat_dev",
	  hostname: "localhost",
	  pool_size: 10
	```

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mkdir -p ./priv/repo/migrations && mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `cd ../ && mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
