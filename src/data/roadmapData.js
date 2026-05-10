// ─────────────────────────────────────────────────────────────────────────────
//  roadmapData.js — All roadmaps with complete resources from original Android app
// ─────────────────────────────────────────────────────────────────────────────

const backendRoadmap = {
  id: "backend", title: "Backend Developer", subtitle: "From internet fundamentals to production APIs",
  icon: "server-outline", color: ["#6366f1", "#0ea5e9"], category: "role",
  modules: [
    {
      id: "be_internet", title: "Internet", subtitle: "How the internet works",
      icon: "globe-outline", xp: 100, status: "completed",
      overview: "The internet is a global network of computers connected using standardized protocols. Understanding how data travels from one computer to another — through packets, routers, and protocols — is the essential foundation for any backend developer.",
      subTopics: [
        { id: "be_int_how", number: "01", title: "How does the Internet work?", description: "Data travels as small packets routed through interconnected computers. Learn about IP addresses, routers, TCP/IP, and the client-server model. Understand what happens from the moment you hit Enter on a URL to when a page loads.", resources: [{ type: "Course", label: "CS50 – Intro to Computer Science", url: "https://cs50.harvard.edu/x/" }, { type: "Video", label: "Khan Academy – How the Internet Works", url: "https://www.khanacademy.org/computing/computers-and-internet" }, { type: "Official", label: "MDN – How the Web Works", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works" }] },
        { id: "be_int_http", number: "02", title: "What is HTTP?", description: "HTTP governs how browsers and servers communicate. Learn GET, POST, PUT, DELETE methods, status codes (200, 404, 500), request/response headers, and the difference between HTTP and HTTPS.", resources: [{ type: "Official", label: "MDN – HTTP Overview", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview" }, { type: "Video", label: "HTTP Crash Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=iYM2zFP3Zn0" }, { type: "Course", label: "Udacity – HTTP & Web Servers", url: "https://www.udacity.com/course/http-web-servers--ud303" }] },
        { id: "be_int_domain", number: "03", title: "What is a Domain Name?", description: "Domain names are human-readable addresses for websites. Learn about TLDs, subdomains, DNS records (A, CNAME, MX, TXT), domain registration, WHOIS, and how domains map to IP addresses.", resources: [{ type: "Official", label: "MDN – What is a Domain Name", url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name" }, { type: "Official", label: "ICANN – Beginner's Guide", url: "https://www.icann.org/resources/pages/beginners-guides-2012-03-06-en" }, { type: "Course", label: "Namecheap – DNS Learning Center", url: "https://www.namecheap.com/guru-guides/" }] },
        { id: "be_int_hosting", number: "04", title: "What is Hosting?", description: "Web hosting stores your app on a server accessible via the internet. Learn the difference between shared hosting, VPS, dedicated servers, and cloud hosting. Understand uptime, bandwidth, and scalability tradeoffs.", resources: [{ type: "Video", label: "freeCodeCamp – Web Hosting Explained", url: "https://www.freecodecamp.org/news/web-hosting-for-beginners/" }, { type: "Official", label: "DigitalOcean – Cloud Basics Tutorials", url: "https://www.digitalocean.com/community/tutorials" }, { type: "Official", label: "AWS Free Tier Docs", url: "https://aws.amazon.com/free/" }] },
        { id: "be_int_dns", number: "05", title: "DNS and How It Works", description: "DNS translates human-readable domain names to IP addresses. Learn about recursive resolvers, root servers, TLD servers, DNS record types, and propagation delays. Every web request starts with a DNS lookup.", resources: [{ type: "Official", label: "Cloudflare – What is DNS?", url: "https://www.cloudflare.com/learning/dns/what-is-dns/" }, { type: "Video", label: "DNS Explained – freeCodeCamp", url: "https://www.youtube.com/watch?v=72snZctFFtA" }, { type: "Official", label: "Google Public DNS Docs", url: "https://developers.google.com/speed/public-dns/docs/intro" }] },
        { id: "be_int_browsers", number: "06", title: "Browsers and How They Work", description: "Understand the rendering pipeline, JavaScript engines, and how a browser parses HTML and CSS into a DOM tree. Know the difference between the browser environment and the server environment.", resources: [{ type: "Official", label: "web.dev – How Browsers Work", url: "https://web.dev/articles/howbrowserswork" }, { type: "Official", label: "MDN – Browser Engine Overview", url: "https://developer.mozilla.org/en-US/docs/Glossary/Browser" }, { type: "Video", label: "Google Chrome University (YouTube)", url: "https://www.youtube.com/watch?v=0IsQqJ7pwhw" }] },
      ],
    },
    {
      id: "be_frontend_basic", title: "Frontend Basics", subtitle: "HTML, CSS and JavaScript essentials",
      icon: "code-slash-outline", xp: 150, status: "completed",
      overview: "Even as a backend developer, understanding the frontend is critical. You need to know how HTML structures content, CSS styles it, and JavaScript adds interactivity — so you can communicate with frontend teams and debug full-stack issues.",
      subTopics: [
        { id: "be_fe_html", number: "01", title: "HTML", description: "HTML is the skeleton of every web page. Learn semantic elements, forms, tables, links, and how the browser parses HTML into a DOM tree. This knowledge is key to understanding what your backend is serving.", resources: [{ type: "Official", label: "MDN – HTML Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML" }, { type: "Course", label: "freeCodeCamp – Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/" }, { type: "Course", label: "W3Schools HTML Tutorial", url: "https://www.w3schools.com/html/" }] },
        { id: "be_fe_css", number: "02", title: "CSS", description: "CSS controls the visual presentation of HTML. Learn selectors, the box model, flexbox, grid, and responsive design. As a backend developer, understanding CSS helps you serve the right assets and debug layout-related API issues.", resources: [{ type: "Official", label: "MDN – CSS First Steps", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps" }, { type: "Video", label: "freeCodeCamp – CSS Full Course", url: "https://www.youtube.com/watch?v=1Rs2ND1ryYc" }, { type: "Course", label: "web.dev – Learn CSS", url: "https://web.dev/learn/css/" }] },
        { id: "be_fe_js", number: "03", title: "JavaScript", description: "JavaScript is widely used on the backend via Node.js. Learn variables, functions, DOM manipulation, Promises, and async/await. Even if you use another backend language, JS knowledge is invaluable for understanding how clients consume APIs.", resources: [{ type: "Course", label: "The Odin Project – JavaScript", url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript" }, { type: "Official", label: "javascript.info – Full JS Guide", url: "https://javascript.info/" }, { type: "Course", label: "freeCodeCamp – JavaScript Algorithms", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" }] },
      ],
    },
    {
      id: "be_pick_language", title: "Pick a Backend Language", subtitle: "Choose your primary backend language",
      icon: "terminal-outline", xp: 200, status: "active",
      overview: "Your backend language is the foundation of everything you build. Each has strengths — Java for enterprise, Python for simplicity and ML, Node.js for full-stack, Go and Rust for high performance. Pick one and go deep before exploring others.",
      subTopics: [
        { id: "be_lang_js", number: "01", title: "JavaScript (Node.js)", description: "Node.js lets you run JavaScript on the server. It's non-blocking and event-driven, making it excellent for real-time apps and REST APIs. With npm you get access to the largest package ecosystem in the world.", resources: [{ type: "Course", label: "The Odin Project – Node.js", url: "https://www.theodinproject.com/paths/full-stack-javascript" }, { type: "Course", label: "freeCodeCamp – Back End APIs", url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/" }, { type: "Official", label: "Node.js Official Docs", url: "https://nodejs.org/en/docs/" }] },
        { id: "be_lang_go", number: "02", title: "Go", description: "Go (Golang) is a statically-typed, compiled language by Google for simplicity and performance. Excellent for microservices and high-concurrency backends. Built-in goroutines make concurrency straightforward.", resources: [{ type: "Official", label: "Go Official Tour", url: "https://go.dev/tour/welcome/1" }, { type: "Video", label: "freeCodeCamp – Golang Full Course", url: "https://www.youtube.com/watch?v=un6ZyFkqFKo" }, { type: "Course", label: "Go by Example", url: "https://gobyexample.com/" }] },
        { id: "be_lang_python", number: "03", title: "Python", description: "Python's clean syntax and vast ecosystem make it one of the most popular backend languages. Use Django for full-featured apps or FastAPI/Flask for lightweight APIs. Also dominates in data science and AI.", resources: [{ type: "Course", label: "CS50P – Python (Harvard, Free)", url: "https://cs50.harvard.edu/python/" }, { type: "Official", label: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/" }, { type: "Video", label: "Corey Schafer – Python Series", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU" }] },
        { id: "be_lang_ruby", number: "04", title: "Ruby", description: "Ruby is known for elegant syntax and developer happiness. Ruby on Rails pioneered MVC, migrations, and scaffolding conventions. Great for startups and rapid prototyping. GitHub and Shopify were built on Rails.", resources: [{ type: "Course", label: "The Odin Project – Ruby", url: "https://www.theodinproject.com/paths/full-stack-ruby-on-rails" }, { type: "Official", label: "Ruby Official Docs", url: "https://www.ruby-lang.org/en/documentation/" }, { type: "Video", label: "freeCodeCamp – Ruby on Rails", url: "https://www.youtube.com/watch?v=B3Fbujmgo60" }] },
        { id: "be_lang_java", number: "05", title: "Java", description: "Java is the king of enterprise backend development. Spring Boot makes it easy to build production-ready REST APIs and microservices. As an Android developer you already know Java — Spring Boot is your most natural next step.", resources: [{ type: "Official", label: "Spring Boot Official Guides", url: "https://spring.io/guides" }, { type: "Video", label: "Java Brains – Spring Boot (YouTube)", url: "https://www.youtube.com/c/JavaBrains" }, { type: "Course", label: "Baeldung – Spring Tutorials", url: "https://www.baeldung.com/spring-tutorial" }] },
        { id: "be_lang_csharp", number: "06", title: "C#", description: "C# with ASP.NET Core is Microsoft's powerful backend stack, widely used in enterprise and game development. It compiles to fast native code and the .NET ecosystem provides libraries for almost everything.", resources: [{ type: "Official", label: "Microsoft Learn – ASP.NET Core", url: "https://learn.microsoft.com/en-us/aspnet/core/" }, { type: "Video", label: "freeCodeCamp – C# Full Course", url: "https://www.youtube.com/watch?v=GhQdlIFylQ8" }, { type: "Official", label: "dotnet Official Learn", url: "https://dotnet.microsoft.com/en-us/learn" }] },
        { id: "be_lang_php", number: "07", title: "PHP", description: "PHP powers over 75% of the web including WordPress. Laravel is its modern MVC framework offering elegant syntax and powerful tooling. PHP is easy to deploy and has unmatched shared-hosting support.", resources: [{ type: "Official", label: "PHP Official Manual", url: "https://www.php.net/manual/en/" }, { type: "Course", label: "Laracasts – Laravel from Scratch", url: "https://laracasts.com/series/laravel-8-from-scratch" }, { type: "Video", label: "freeCodeCamp – PHP Full Course", url: "https://www.youtube.com/watch?v=OK_JCtrrv-c" }] },
        { id: "be_lang_rust", number: "08", title: "Rust", description: "Rust is a systems language focused on memory safety and blazing performance without a garbage collector. Increasingly used for high-performance web backends and WebAssembly. Axum and Actix-Web are popular Rust web frameworks.", resources: [{ type: "Official", label: "The Rust Book", url: "https://doc.rust-lang.org/book/" }, { type: "Official", label: "Rust Official Learn Page", url: "https://www.rust-lang.org/learn" }, { type: "Video", label: "freeCodeCamp – Rust Beginners Course", url: "https://www.youtube.com/watch?v=BpPEoZW5IiY" }] },
      ],
    },
    {
      id: "be_vcs", title: "Version Control Systems", subtitle: "Git, GitHub and GitLab",
      icon: "git-branch-outline", xp: 150, status: "locked",
      overview: "Version control tracks every change to your codebase so you can collaborate, roll back mistakes, and ship confidently. Git is the industry standard. GitHub and GitLab add pull requests, code reviews, and CI/CD pipelines on top.",
      subTopics: [
        { id: "be_vcs_git", number: "01", title: "Git", description: "Git is a distributed version control system. Master the core workflow: clone, add, commit, push, pull, branch, merge, and rebase. Learn to resolve merge conflicts and use git log to trace history. Non-negotiable for any developer.", resources: [{ type: "Official", label: "Pro Git Book – Official", url: "https://git-scm.com/book/en/v2" }, { type: "Video", label: "Git & GitHub Crash Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=RGOj5yH7evk" }, { type: "Course", label: "GitHub Skills – Interactive Labs", url: "https://skills.github.com/" }] },
        { id: "be_vcs_github", number: "02", title: "GitHub", description: "GitHub is the world's largest code hosting platform. Learn to create repos, fork projects, raise pull requests, and review code. Understand GitHub Actions for CI/CD and GitHub Issues for task tracking. Your GitHub profile is your portfolio.", resources: [{ type: "Official", label: "GitHub Docs – Getting Started", url: "https://docs.github.com/en/get-started" }, { type: "Course", label: "GitHub Skills – Free Interactive", url: "https://skills.github.com/" }, { type: "Video", label: "freeCodeCamp – GitHub for Beginners", url: "https://www.youtube.com/watch?v=tRZGeaHPoaw" }] },
        { id: "be_vcs_gitlab", number: "03", title: "GitLab", description: "GitLab is a complete DevOps platform with built-in CI/CD, container registry, and security scanning — and can be self-hosted for free. Learn GitLab pipelines, merge requests, and environments. Many enterprises prefer it for its all-in-one approach.", resources: [{ type: "Official", label: "GitLab Learn – Official", url: "https://about.gitlab.com/learn/" }, { type: "Video", label: "GitLab CI/CD Tutorial – YouTube", url: "https://www.youtube.com/watch?v=pPNBnlI_EQE" }, { type: "Course", label: "Atlassian Git Tutorials", url: "https://www.atlassian.com/git/tutorials" }] },
      ],
    },
    {
      id: "be_relational_db", title: "Relational Databases", subtitle: "SQL, migrations and the N+1 problem",
      icon: "layers-outline", xp: 250, status: "locked",
      overview: "Relational databases store structured data in tables linked by foreign keys. SQL is the universal query language. Every backend developer must master at least one RDBMS. Understanding ACID, normalization, indexes, and the N+1 problem separates senior developers from juniors.",
      subTopics: [
        { id: "be_reldb_mysql", number: "01", title: "MySQL", description: "The world's most widely deployed open-source RDBMS. Learn tables, primary and foreign keys, JOINs, GROUP BY, transactions, and indexes. The InnoDB engine supports ACID compliance and row-level locking.", resources: [{ type: "Course", label: "MySQL Tutorial – W3Schools", url: "https://www.w3schools.com/mysql/" }, { type: "Video", label: "MySQL Crash Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY" }, { type: "Official", label: "MySQL Official Docs", url: "https://dev.mysql.com/doc/" }] },
        { id: "be_reldb_sqlite", number: "02", title: "SQLite", description: "A lightweight, serverless, file-based database embedded directly in your app — no server process needed. You're already using it in Android via Room. Perfect for mobile apps, prototyping, and desktop applications.", resources: [{ type: "Official", label: "SQLite Official Docs", url: "https://www.sqlite.org/docs.html" }, { type: "Course", label: "SQLite Tutorial.net", url: "https://www.sqlitetutorial.net/" }, { type: "Course", label: "CS50 SQL – Harvard (Free)", url: "https://cs50.harvard.edu/sql/" }] },
        { id: "be_reldb_oracle", number: "03", title: "Oracle", description: "Oracle Database is the dominant enterprise-grade RDBMS used in banks and government systems. It offers advanced features like partitioning, RAC clusters, and PL/SQL. Understanding Oracle opens doors to high-paying enterprise backend roles.", resources: [{ type: "Official", label: "Oracle Live SQL – Free Practice", url: "https://livesql.oracle.com/" }, { type: "Official", label: "Oracle Database Concepts Docs", url: "https://docs.oracle.com/en/database/oracle/oracle-database/" }, { type: "Video", label: "freeCodeCamp – Oracle SQL Tutorial", url: "https://www.youtube.com/watch?v=-TP_qRRUado" }] },
        { id: "be_reldb_mssql", number: "04", title: "MS SQL Server", description: "Widely used in enterprises running the .NET stack. Features T-SQL, SQL Server Agent for scheduling, and SSMS for GUI management. Learn stored procedures, views, triggers, and query execution plans.", resources: [{ type: "Official", label: "Microsoft Learn – SQL Server", url: "https://learn.microsoft.com/en-us/sql/sql-server/" }, { type: "Course", label: "W3Schools – SQL Tutorial", url: "https://www.w3schools.com/sql/" }, { type: "Video", label: "freeCodeCamp – SQL Server Course", url: "https://www.youtube.com/watch?v=7GVFYt6_ZFM" }] },
        { id: "be_reldb_mariadb", number: "05", title: "MariaDB", description: "A community-driven fork of MySQL by its original developers, offering improved performance, more storage engines, and enhanced security. A drop-in MySQL replacement popular in Linux LAMP stacks.", resources: [{ type: "Official", label: "MariaDB Official Docs", url: "https://mariadb.com/kb/en/documentation/" }, { type: "Official", label: "MariaDB Knowledgebase", url: "https://mariadb.com/kb/en/" }, { type: "Course", label: "W3Schools – MySQL/MariaDB SQL", url: "https://www.w3schools.com/mysql/" }] },
        { id: "be_reldb_postgres", number: "06", title: "PostgreSQL", description: "The most powerful open-source RDBMS. Supports advanced data types (JSON, arrays, UUID), full-text search, window functions, and custom extensions. Follows the SQL standard strictly. Preferred for complex queries and strict data integrity.", resources: [{ type: "Course", label: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/" }, { type: "Course", label: "CS50 SQL – Harvard (Free)", url: "https://cs50.harvard.edu/sql/" }, { type: "Official", label: "SQLZoo – Interactive SQL", url: "https://sqlzoo.net/" }] },
        { id: "be_reldb_migrations", number: "07", title: "Migrations", description: "Database migrations are version-controlled scripts that evolve your schema over time without losing data — adding columns, renaming tables, creating indexes. Tools: Flyway (Java), Liquibase, Alembic (Python).", resources: [{ type: "Official", label: "Flyway – Getting Started", url: "https://documentation.red-gate.com/fd/getting-started-with-flyway-184127223.html" }, { type: "Official", label: "Liquibase Quickstart", url: "https://www.liquibase.org/get-started/quickstart" }, { type: "Official", label: "Alembic Docs – SQLAlchemy", url: "https://alembic.sqlalchemy.org/en/latest/tutorial.html" }] },
        { id: "be_reldb_nplusone", number: "08", title: "N+1 Problem", description: "A common performance killer where code issues 1 query to fetch a list, then N additional queries for related data on each row — instead of using a JOIN. Learn to identify it in ORM logs and fix it with eager loading or batch queries.", resources: [{ type: "Course", label: "Baeldung – Hibernate N+1 Problem", url: "https://www.baeldung.com/hibernate-common-performance-problems-in-logs" }, { type: "Official", label: "Hibernate – Eager vs Lazy Loading", url: "https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html#fetching" }, { type: "Official", label: "SQLAlchemy – Eager Loading Docs", url: "https://docs.sqlalchemy.org/en/20/orm/loading_relationships.html" }] },
      ],
    },
    {
      id: "be_apis", title: "Learn about APIs", subtitle: "REST, GraphQL, Auth, Security & Best Practices",
      icon: "swap-horizontal-outline", xp: 300, status: "locked",
      overview: "APIs are how your backend communicates with the outside world — browsers, mobile apps, and other services. Master multiple API styles, authentication strategies, OpenAPI documentation, and security best practices.",
      subTopics: [
        { id: "be_api_rest", number: "01", title: "REST", description: "The most popular API style. Uses HTTP methods (GET, POST, PUT, PATCH, DELETE) and stateless requests. Resources identified by URLs, data exchanged as JSON. Master resource naming, status codes, pagination, and versioning.", resources: [{ type: "Course", label: "RESTful API Design – Codecademy", url: "https://www.codecademy.com/article/what-is-rest" }, { type: "Video", label: "REST API Crash Course – Traversy Media", url: "https://www.youtube.com/watch?v=Q-BpqyOT3a8" }, { type: "Course", label: "freeCodeCamp – REST API Tutorial", url: "https://www.freecodecamp.org/news/rest-api-tutorial-rest-client-rest-service-and-api-calls-explained-with-code-examples/" }] },
        { id: "be_api_json", number: "02", title: "JSON APIs", description: "JSON is the universal data format for web APIs. Learn to serialize and deserialize JSON, handle nested objects, arrays, null values, and data types. The JSON:API specification provides conventions for consistent request/response structures.", resources: [{ type: "Official", label: "JSON.org – Official Introduction", url: "https://www.json.org/json-en.html" }, { type: "Official", label: "MDN – Working with JSON", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON" }, { type: "Course", label: "JSONPlaceholder – Practice API", url: "https://jsonplaceholder.typicode.com/" }] },
        { id: "be_api_soap", number: "03", title: "SOAP", description: "An XML-based protocol used heavily in enterprise and banking systems. Defines a strict message format using WSDL. While REST has largely replaced it in new projects, many legacy systems still expose SOAP endpoints.", resources: [{ type: "Course", label: "W3Schools – SOAP Tutorial", url: "https://www.w3schools.com/xml/xml_soap.asp" }, { type: "Official", label: "IBM – What is SOAP?", url: "https://www.ibm.com/think/topics/soap-vs-rest" }, { type: "Official", label: "MDN – SOAP Web Services", url: "https://developer.mozilla.org/en-US/docs/Glossary/SOAP" }] },
        { id: "be_api_grpc", number: "04", title: "gRPC", description: "A high-performance RPC framework from Google using Protocol Buffers (protobuf) for efficient binary serialization — much faster than JSON. Excellent for microservice-to-microservice communication. Supports streaming and is language-agnostic.", resources: [{ type: "Official", label: "gRPC Official Docs", url: "https://grpc.io/docs/" }, { type: "Video", label: "gRPC Crash Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=Yw4rkaTc0f8" }, { type: "Official", label: "Protocol Buffers Docs", url: "https://protobuf.dev/" }] },
        { id: "be_api_graphql", number: "05", title: "GraphQL", description: "A query language for APIs by Facebook where the client specifies exactly what data it needs, eliminating over-fetching and under-fetching. A single endpoint handles all queries, mutations, and subscriptions. Apollo and Hasura are popular tools.", resources: [{ type: "Official", label: "GraphQL Official Learn", url: "https://graphql.org/learn/" }, { type: "Course", label: "How to GraphQL – Full Tutorial", url: "https://www.howtographql.com/" }, { type: "Official", label: "Apollo GraphQL Docs", url: "https://www.apollographql.com/docs/" }] },
        { id: "be_api_openapi", number: "06", title: "Open API Specs", description: "The OpenAPI Specification (formerly Swagger) is the standard for documenting REST APIs. Write a YAML/JSON spec and tools auto-generate interactive docs, client SDKs, and server stubs. Makes your API self-documenting.", resources: [{ type: "Official", label: "Swagger Official Docs", url: "https://swagger.io/docs/" }, { type: "Official", label: "OpenAPI 3.0 Guide", url: "https://swagger.io/specification/" }, { type: "Course", label: "Postman API Documentation", url: "https://learning.postman.com/docs/publishing-your-api/documenting-your-api/" }] },
        { id: "be_api_jwt", number: "07", title: "JWT", description: "JWT is a compact, self-contained token for stateless authentication. After login, the server issues a signed JWT the client sends in every request header. Learn the header.payload.signature structure, expiry (exp), and refresh token patterns.", resources: [{ type: "Official", label: "JWT.io – Introduction", url: "https://jwt.io/introduction" }, { type: "Course", label: "Auth0 – JWT Handbook", url: "https://auth0.com/resources/ebooks/jwt-handbook" }, { type: "Video", label: "freeCodeCamp – JWT Explained", url: "https://www.freecodecamp.org/news/what-are-json-web-tokens-jwt-auth-tutorial/" }] },
        { id: "be_api_oauth", number: "08", title: "OAuth 2.0", description: "OAuth 2.0 is the standard for authorization delegation — it powers 'Sign in with Google' and 'Login with GitHub'. Learn authorization code flow, PKCE, scopes, and access vs refresh tokens.", resources: [{ type: "Course", label: "OAuth 2.0 Simplified – Aaron Parecki", url: "https://www.oauth.com/" }, { type: "Official", label: "Auth0 – OAuth Overview", url: "https://auth0.com/intro-to-iam/what-is-oauth-2" }, { type: "Official", label: "Google Identity – OAuth 2.0", url: "https://developers.google.com/identity/protocols/oauth2" }] },
        { id: "be_api_basic_auth", number: "09", title: "Basic Authentication", description: "HTTP Basic Auth sends credentials as a Base64-encoded username:password in the Authorization header. Simple to implement but always requires HTTPS. Suitable for internal tools and simple API clients.", resources: [{ type: "Official", label: "MDN – HTTP Authentication", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication" }, { type: "Official", label: "RFC 7617 – Basic Auth Spec", url: "https://www.rfc-editor.org/rfc/rfc7617" }, { type: "Course", label: "Postman – Basic Auth Guide", url: "https://learning.postman.com/docs/sending-requests/authorization/" }] },
        { id: "be_api_token_auth", number: "10", title: "Token Authentication", description: "Token-based auth stores a random opaque token in a database and checks it on each request. Tokens can be revoked instantly unlike JWTs. Used by Django REST Framework, GitHub Personal Access Tokens, and API keys.", resources: [{ type: "Official", label: "Django REST – Token Auth Docs", url: "https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication" }, { type: "Official", label: "Auth0 – Token-Based Auth Guide", url: "https://auth0.com/learn/token-based-authentication-made-easy" }, { type: "Video", label: "freeCodeCamp – API Key Authentication", url: "https://www.freecodecamp.org/news/how-to-create-an-api-key/" }] },
        { id: "be_api_cookie_auth", number: "11", title: "Cookie Based Auth", description: "Cookie-based (session) authentication stores a session ID in an HTTP cookie after login. Learn HttpOnly and Secure cookie flags, SameSite CSRF protection, and session fixation attacks. This is the traditional web app authentication model.", resources: [{ type: "Official", label: "MDN – HTTP Cookies", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies" }, { type: "Official", label: "OWASP – Session Management Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html" }, { type: "Course", label: "web.dev – SameSite Cookies Explained", url: "https://web.dev/articles/samesite-cookies-explained" }] },
        { id: "be_api_openid", number: "12", title: "OpenID Connect", description: "OpenID Connect (OIDC) is an identity layer on top of OAuth 2.0. While OAuth handles 'what you can access', OIDC handles 'who you are'. It provides an ID Token (JWT) with user identity claims. Firebase Authentication uses OIDC under the hood.", resources: [{ type: "Official", label: "OpenID Connect Official", url: "https://openid.net/developers/how-connect-works/" }, { type: "Official", label: "Auth0 – OIDC Overview", url: "https://auth0.com/docs/authenticate/protocols/openid-connect-protocol" }, { type: "Course", label: "Okta – OIDC & OAuth 2.0 Guide", url: "https://developer.okta.com/docs/concepts/oauth-openid/" }] },
        { id: "be_api_saml", number: "13", title: "SAML", description: "SAML is an XML-based standard for enterprise SSO (Single Sign-On). Lets employees log in once to their company's identity provider and access multiple services. Common in large organizations and SaaS B2B products.", resources: [{ type: "Official", label: "SAML.xml – Official Overview", url: "https://saml.xml.org/saml-specifications" }, { type: "Official", label: "Okta – What is SAML?", url: "https://www.okta.com/blog/2020/09/what-is-saml/" }, { type: "Course", label: "OneLogin – SAML Tutorial", url: "https://developers.onelogin.com/saml" }] },
        { id: "be_api_md5", number: "14", title: "MD5", description: "MD5 produces a 128-bit hash once used for password hashing. It is now considered cryptographically broken — NEVER use it for passwords. Understand why it's vulnerable to collision and rainbow table attacks, and know what to use instead.", resources: [{ type: "Official", label: "Cloudflare – What is MD5?", url: "https://www.cloudflare.com/learning/ssl/what-is-hashing/" }, { type: "Official", label: "OWASP – Password Storage Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" }, { type: "Video", label: "freeCodeCamp – Hashing Explained", url: "https://www.freecodecamp.org/news/md5-vs-sha-1-vs-sha-2-which-is-the-most-secure-encryption-hash/" }] },
        { id: "be_api_sha", number: "15", title: "SHA", description: "SHA family — SHA-256 and SHA-512 — are currently secure and used for data integrity (code signing, SSL certificates, blockchain). Plain SHA is too fast for password hashing — use bcrypt or Argon2 for passwords instead.", resources: [{ type: "Official", label: "NIST – Hash Functions Overview", url: "https://csrc.nist.gov/projects/hash-functions" }, { type: "Video", label: "Computerphile – SHA Explained", url: "https://www.youtube.com/watch?v=DMtFhACPnTY" }, { type: "Course", label: "SSL.com – Hashing Algorithms", url: "https://www.ssl.com/article/what-are-sha-1-sha-2-and-sha-256-how-do-they-work/" }] },
        { id: "be_api_scrypt", number: "16", title: "scrypt", description: "scrypt is a memory-hard password-based key derivation function that makes brute-force attacks expensive in both CPU and RAM. Designed to resist hardware attacks like ASIC crackers. Recommended for high-security password storage alongside Argon2.", resources: [{ type: "Official", label: "scrypt – Original Paper", url: "https://www.tarsnap.com/scrypt.html" }, { type: "Official", label: "OWASP – Password Storage: scrypt", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" }, { type: "Course", label: "Authlib – scrypt Docs", url: "https://docs.authlib.org/en/latest/" }] },
        { id: "be_api_bcrypt", number: "17", title: "bcrypt", description: "The most widely used adaptive password hashing algorithm. Automatically salts passwords (preventing rainbow table attacks) and has a configurable cost factor so you can make it slower as hardware gets faster. Never store plain-text passwords.", resources: [{ type: "Official", label: "bcrypt – Algorithm Overview", url: "https://en.wikipedia.org/wiki/Bcrypt" }, { type: "Official", label: "OWASP – Password Storage Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" }, { type: "Course", label: "Auth0 – Hashing in Action with bcrypt", url: "https://auth0.com/blog/hashing-in-action-understanding-bcrypt/" }] },
        { id: "be_api_https", number: "18", title: "HTTPS", description: "HTTPS encrypts all data between client and server using TLS. Learn how SSL certificates work, certificate authorities, the TLS handshake, and how to get a free certificate via Let's Encrypt. All production backends must use HTTPS.", resources: [{ type: "Official", label: "Let's Encrypt – How HTTPS Works", url: "https://letsencrypt.org/how-it-works/" }, { type: "Official", label: "Cloudflare – What is TLS?", url: "https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/" }, { type: "Course", label: "SSL.com – TLS Handshake Explained", url: "https://www.ssl.com/article/ssl-tls-handshake-overview/" }] },
        { id: "be_api_owasp", number: "19", title: "OWASP Risks", description: "OWASP Top 10 lists the most critical web security risks: SQL Injection, Broken Authentication, XSS, Insecure Deserialization, Security Misconfiguration, and more. Every backend developer must know these attack vectors and how to defend against each.", resources: [{ type: "Official", label: "OWASP Top 10 – Official", url: "https://owasp.org/www-project-top-ten/" }, { type: "Course", label: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security" }, { type: "Official", label: "OWASP WebGoat – Practice Lab", url: "https://owasp.org/www-project-webgoat/" }] },
        { id: "be_api_cors", number: "20", title: "CORS", description: "CORS controls which origins can make requests to your API. Learn how to configure Access-Control-Allow-Origin, preflight OPTIONS requests, credentials mode, and wildcard vs specific origins. Misconfiguring CORS is a common vulnerability.", resources: [{ type: "Official", label: "MDN – CORS Explained", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" }, { type: "Official", label: "web.dev – Cross-Origin Resource Sharing", url: "https://web.dev/articles/cross-origin-resource-sharing" }, { type: "Course", label: "freeCodeCamp – CORS Tutorial", url: "https://www.freecodecamp.org/news/cors-explained/" }] },
        { id: "be_api_ssl", number: "21", title: "SSL/TLS", description: "SSL and its successor TLS are cryptographic protocols for secure communication. Understand symmetric vs asymmetric encryption, certificate chains, SNI, TLS 1.2 vs 1.3 improvements, and how to configure your server's TLS settings correctly.", resources: [{ type: "Official", label: "Cloudflare – SSL/TLS Learning Center", url: "https://www.cloudflare.com/learning/ssl/what-is-ssl/" }, { type: "Course", label: "SSL.com – SSL vs TLS", url: "https://www.ssl.com/article/ssl-vs-tls-whats-the-difference/" }, { type: "Official", label: "Mozilla SSL Config Generator", url: "https://ssl-config.mozilla.org/" }] },
        { id: "be_api_csp", number: "22", title: "CSP", description: "Content Security Policy is an HTTP response header that tells browsers which content sources are allowed, dramatically reducing XSS attack surface. Learn directives like script-src, style-src, img-src, and use report-uri to collect violations before enforcing.", resources: [{ type: "Official", label: "MDN – Content Security Policy", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP" }, { type: "Official", label: "web.dev – CSP Guide", url: "https://web.dev/articles/csp" }, { type: "Course", label: "CSP Evaluator – Google Tool", url: "https://csp-evaluator.withgoogle.com/" }] },
        { id: "be_api_server_sec", number: "23", title: "Server Security", description: "Securing your server: keep OS and software updated, disable unused ports, configure firewalls (ufw, iptables), use SSH keys instead of passwords, run apps as non-root users, and monitor logs for intrusion attempts.", resources: [{ type: "Course", label: "DigitalOcean – Server Security Guide", url: "https://www.digitalocean.com/community/tutorials/an-introduction-to-securing-your-linux-vps" }, { type: "Official", label: "OWASP – Infrastructure Security", url: "https://owasp.org/www-project-web-security-testing-guide/" }, { type: "Course", label: "Linux Foundation – Security Essentials", url: "https://training.linuxfoundation.org/training/fundamentals-of-linux-security/" }] },
        { id: "be_api_best_practices", number: "24", title: "API Security Best Practices", description: "Secure your APIs: validate and sanitize all input, use HTTPS everywhere, implement rate limiting, set proper CORS policies, use parameterized queries to prevent SQL injection, log API calls, rotate secrets regularly, never expose stack traces to clients.", resources: [{ type: "Official", label: "OWASP API Security Top 10", url: "https://owasp.org/www-project-api-security/" }, { type: "Course", label: "Postman – API Security Guide", url: "https://www.postman.com/api-platform/api-security/" }, { type: "Official", label: "Auth0 – Secure API Best Practices", url: "https://auth0.com/blog/nine-tips-to-harden-your-security-practices/" }] },
      ],
    },
    {
      id: "be_caching", title: "Caching", subtitle: "Redis, Memcached and HTTP Caching",
      icon: "flash-outline", xp: 200, status: "locked",
      overview: "Caching stores frequently accessed data in fast temporary storage so your backend doesn't hit the database on every request. It dramatically reduces latency and database load. Learn server-side caches (Redis, Memcached) and HTTP-level caching headers.",
      subTopics: [
        { id: "be_cache_redis", number: "01", title: "Redis", description: "Redis is an in-memory key-value store for caching, session management, and pub/sub messaging. Learn basic commands (SET, GET, EXPIRE), data structures (strings, hashes, sorted sets), TTL (time-to-live), and cache invalidation strategies.", resources: [{ type: "Course", label: "Redis University – Free Courses", url: "https://university.redis.com/" }, { type: "Video", label: "Redis Crash Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=jgpVdJB2sKQ" }, { type: "Official", label: "Try Redis – Interactive Browser Tutorial", url: "https://try.redis.io/" }] },
        { id: "be_cache_memcached", number: "02", title: "Memcached", description: "Memcached is a simple, high-performance distributed memory cache. Unlike Redis it only supports strings and has no persistence or pub/sub. It's multi-threaded so it can outperform Redis for simple caching workloads on multi-core servers.", resources: [{ type: "Official", label: "Memcached Official Wiki", url: "https://github.com/memcached/memcached/wiki" }, { type: "Course", label: "DigitalOcean – Memcached Setup Guide", url: "https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-memcached-on-ubuntu-20-04" }, { type: "Video", label: "Memcached vs Redis – YouTube", url: "https://www.youtube.com/watch?v=wu8xmTsFGJ0" }] },
        { id: "be_cache_http", number: "03", title: "HTTP Caching", description: "HTTP caching uses response headers to store data at the browser, CDN, or proxy level. Learn Cache-Control directives (max-age, no-cache, no-store), ETags for conditional requests, and Last-Modified headers. Correct HTTP caching can eliminate server requests entirely.", resources: [{ type: "Official", label: "MDN – HTTP Caching", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching" }, { type: "Official", label: "web.dev – HTTP Cache (Google)", url: "https://web.dev/articles/http-cache" }, { type: "Official", label: "Cloudflare – What is Caching?", url: "https://www.cloudflare.com/learning/cdn/what-is-caching/" }] },
      ],
    },
    {
      id: "be_web_servers", title: "Web Servers", subtitle: "Nginx, Apache, Caddy and MS IIS",
      icon: "cloud-outline", xp: 150, status: "locked",
      overview: "A web server handles incoming HTTP requests and serves responses. It's the gateway between clients and your backend application. Learn the major web servers, how to configure them as reverse proxies, enable HTTPS, and serve static files efficiently.",
      subTopics: [
        { id: "be_ws_nginx", number: "01", title: "Nginx", description: "Nginx is a high-performance, event-driven web server, reverse proxy, and load balancer. Learn how to configure server blocks (virtual hosts), proxy requests to your app server, enable HTTPS with Let's Encrypt, serve static files, and configure gzip compression.", resources: [{ type: "Official", label: "Nginx Official Beginner's Guide", url: "https://nginx.org/en/docs/beginners_guide.html" }, { type: "Video", label: "Nginx Crash Course – Traversy Media", url: "https://www.youtube.com/watch?v=7VAI73roXaY" }, { type: "Course", label: "DigitalOcean – Nginx Tutorials", url: "https://www.digitalocean.com/community/tags/nginx" }] },
        { id: "be_ws_apache", number: "02", title: "Apache", description: "Apache HTTP Server is one of the oldest and most widely used web servers. Learn about virtual hosts, .htaccess files, mod_rewrite for URL routing, and Apache modules. Understand how it differs from Nginx — process-based vs event-driven.", resources: [{ type: "Official", label: "Apache Official Documentation", url: "https://httpd.apache.org/docs/" }, { type: "Course", label: "DigitalOcean – Apache vs Nginx", url: "https://www.digitalocean.com/community/tutorials/apache-vs-nginx-practical-considerations" }, { type: "Official", label: "Apache Getting Started", url: "https://httpd.apache.org/docs/current/getting-started.html" }] },
        { id: "be_ws_caddy", number: "03", title: "Caddy", description: "Caddy is a modern, easy-to-use web server that automatically obtains and renews HTTPS certificates via Let's Encrypt — no manual configuration needed. Its Caddyfile syntax is far simpler than Nginx config. Great for developers who want HTTPS out of the box.", resources: [{ type: "Official", label: "Caddy Official Docs", url: "https://caddyserver.com/docs/" }, { type: "Video", label: "Caddy Web Server Tutorial – YouTube", url: "https://www.youtube.com/watch?v=t4naLFSlBpQ" }, { type: "Course", label: "DigitalOcean – Getting Started with Caddy", url: "https://www.digitalocean.com/community/tutorials/how-to-host-a-website-with-caddy-on-ubuntu-22-04" }] },
        { id: "be_ws_iis", number: "04", title: "MS IIS", description: "Internet Information Services (IIS) is Microsoft's web server for Windows, tightly integrated with the .NET/ASP.NET ecosystem. Learn to configure sites, application pools, bindings, SSL certificates, URL rewriting, and IIS Manager.", resources: [{ type: "Official", label: "Microsoft Learn – IIS Documentation", url: "https://learn.microsoft.com/en-us/iis/" }, { type: "Video", label: "IIS Tutorial – freeCodeCamp YouTube", url: "https://www.youtube.com/watch?v=1sHT0psFonM" }, { type: "Course", label: "IIS.net – Getting Started", url: "https://www.iis.net/learn/get-started" }] },
      ],
    },
  ],
};

// ─── PYTHON ROADMAP ───────────────────────────────────────────────────────────
const pythonRoadmap = {
  id: "python", title: "Python Developer", subtitle: "From basics to advanced Python mastery",
  icon: "logo-python", color: ["#f59e0b", "#10b981"], category: "skill",
  modules: [
    {
      id: "py_basics", title: "Python Basics", subtitle: "Variables, data types and control flow",
      icon: "code-outline", xp: 100, status: "completed",
      overview: "Python is a high-level, interpreted, general-purpose programming language. Its simple and readable syntax makes it one of the most beginner-friendly languages, yet powerful enough for cutting-edge AI, web development, and automation.",
      subTopics: [
        { id: "py_b_syntax", number: "01", title: "Basic Syntax", description: "Learn how Python code is structured: indentation, comments (#), print statements, and running .py files. Understand the Python REPL (interactive shell) and how to execute scripts.", resources: [{ type: "Official", label: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/" }, { type: "Course", label: "CS50P – Harvard Python (Free)", url: "https://cs50.harvard.edu/python/" }, { type: "Video", label: "Python for Beginners – freeCodeCamp", url: "https://www.youtube.com/watch?v=rfscVS0vtbw" }] },
        { id: "py_b_variables", number: "02", title: "Variables & Data Types", description: "Learn Python's built-in data types: int, float, str, bool, None. Understand dynamic typing, type() function, and type conversion (int(), str(), float()). Learn variable naming conventions (snake_case).", resources: [{ type: "Official", label: "Python Docs – Data Types", url: "https://docs.python.org/3/library/stdtypes.html" }, { type: "Course", label: "W3Schools – Python Variables", url: "https://www.w3schools.com/python/python_variables.asp" }, { type: "Video", label: "Python Data Types – Corey Schafer", url: "https://www.youtube.com/watch?v=khKv-8q7YmY" }] },
        { id: "py_b_conditionals", number: "03", title: "Conditionals", description: "Control the flow of your program using if, elif, and else statements. Learn comparison operators (==, !=, >, <, >=, <=), logical operators (and, or, not), and the ternary expression (x if condition else y).", resources: [{ type: "Official", label: "Python Docs – if Statements", url: "https://docs.python.org/3/tutorial/controlflow.html#if-statements" }, { type: "Course", label: "W3Schools – Python Conditions", url: "https://www.w3schools.com/python/python_conditions.asp" }, { type: "Video", label: "Python If Else – Corey Schafer", url: "https://www.youtube.com/watch?v=DZwmZ8Usvnk" }] },
        { id: "py_b_loops", number: "04", title: "Loops", description: "Learn Python's two loop types: for loops (iterate over sequences) and while loops (repeat while a condition is true). Understand range(), break, continue, and pass statements. Learn list comprehensions as a Pythonic alternative to loops.", resources: [{ type: "Official", label: "Python Docs – Loops", url: "https://docs.python.org/3/tutorial/controlflow.html#for-statements" }, { type: "Course", label: "W3Schools – Python For Loops", url: "https://www.w3schools.com/python/python_for_loops.asp" }, { type: "Video", label: "Python Loops – freeCodeCamp", url: "https://www.youtube.com/watch?v=6iF8Xb7Z3wQ" }] },
        { id: "py_b_functions", number: "05", title: "Functions", description: "Define reusable blocks of code with def. Learn parameters vs arguments, default values, *args and **kwargs, return statements, and scope (local vs global). Understand docstrings and the importance of writing clean, documented functions.", resources: [{ type: "Official", label: "Python Docs – Functions", url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions" }, { type: "Video", label: "Python Functions – Corey Schafer", url: "https://www.youtube.com/watch?v=9Os0o3wzS_I" }, { type: "Course", label: "Real Python – Defining Functions", url: "https://realpython.com/defining-your-own-python-function/" }] },
        { id: "py_b_typehints", number: "06", title: "Type Casting & Type Hints", description: "Python supports type hints (PEP 484) for better code documentation and IDE support. Learn int(), str(), float(), bool() for explicit conversion. Understand type hints syntax: def greet(name: str) -> str.", resources: [{ type: "Official", label: "PEP 484 – Type Hints", url: "https://peps.python.org/pep-0484/" }, { type: "Course", label: "Real Python – Type Checking", url: "https://realpython.com/python-type-checking/" }, { type: "Video", label: "Python Type Hints – ArjanCodes", url: "https://www.youtube.com/watch?v=QORvB-_mbZ0" }] },
      ],
    },
    {
      id: "py_datastructures", title: "Data Structures", subtitle: "Lists, tuples, sets, dicts and more",
      icon: "list-outline", xp: 150, status: "completed",
      overview: "Python has powerful built-in data structures. Knowing when to use a list vs a tuple vs a set vs a dictionary is fundamental to writing efficient Python code. These are the building blocks of virtually every Python program you'll ever write.",
      subTopics: [
        { id: "py_ds_lists", number: "01", title: "Lists", description: "Lists are ordered, mutable sequences. Learn indexing, slicing, append(), extend(), insert(), remove(), pop(), sort(), reverse(), and list comprehensions. Understand shallow vs deep copy and how lists are stored in memory.", resources: [{ type: "Official", label: "Python Docs – Lists", url: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists" }, { type: "Course", label: "W3Schools – Python Lists", url: "https://www.w3schools.com/python/python_lists.asp" }, { type: "Video", label: "Python Lists – Corey Schafer", url: "https://www.youtube.com/watch?v=W8KRzm-HUcc" }] },
        { id: "py_ds_tuples", number: "02", title: "Tuples", description: "Tuples are ordered, immutable sequences. Learn when to use tuples over lists — they're faster, hashable (can be dict keys), and signal intent (this data won't change). Understand tuple packing/unpacking and named tuples (collections.namedtuple).", resources: [{ type: "Official", label: "Python Docs – Tuples", url: "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences" }, { type: "Course", label: "Real Python – Python Tuples", url: "https://realpython.com/python-lists-tuples/" }, { type: "Video", label: "Python Tuples – Corey Schafer", url: "https://www.youtube.com/watch?v=NI26dqhs2Rk" }] },
        { id: "py_ds_sets", number: "03", title: "Sets", description: "Sets are unordered collections of unique elements. Perfect for membership testing and eliminating duplicates. Learn set operations: union (|), intersection (&), difference (-), symmetric difference (^), and frozenset for immutable sets.", resources: [{ type: "Official", label: "Python Docs – Sets", url: "https://docs.python.org/3/tutorial/datastructures.html#sets" }, { type: "Course", label: "W3Schools – Python Sets", url: "https://www.w3schools.com/python/python_sets.asp" }, { type: "Video", label: "Python Sets – Corey Schafer", url: "https://www.youtube.com/watch?v=sBvaPopWOmQ" }] },
        { id: "py_ds_dicts", number: "04", title: "Dictionaries", description: "Dictionaries are key-value stores — the most used data structure in Python. Learn CRUD operations, .get(), .items(), .keys(), .values(), dict comprehensions, defaultdict, and OrderedDict. Dicts are ordered in Python 3.7+.", resources: [{ type: "Official", label: "Python Docs – Dictionaries", url: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries" }, { type: "Video", label: "Python Dictionaries – Corey Schafer", url: "https://www.youtube.com/watch?v=daefaLgNkw0" }, { type: "Course", label: "Real Python – Python Dicts", url: "https://realpython.com/python-dicts/" }] },
        { id: "py_ds_strings", number: "05", title: "Strings", description: "Strings in Python are immutable sequences of characters. Learn string methods: split(), join(), strip(), replace(), find(), format(), f-strings (PEP 498), and multiline strings. Understand string encoding (UTF-8) and byte strings.", resources: [{ type: "Official", label: "Python Docs – Strings", url: "https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str" }, { type: "Video", label: "Python Strings – Corey Schafer", url: "https://www.youtube.com/watch?v=k9TUPpGqYTo" }, { type: "Course", label: "Real Python – Python f-strings", url: "https://realpython.com/python-f-strings/" }] },
      ],
    },
    {
      id: "py_oop", title: "Object Oriented Programming", subtitle: "Classes, inheritance and design principles",
      icon: "shapes-outline", xp: 200, status: "active",
      overview: "OOP allows you to model real-world entities as objects with attributes (data) and methods (behaviour). Python supports full OOP — classes, inheritance, polymorphism, and encapsulation. Essential for working with frameworks like Django, Flask, and most Python libraries.",
      subTopics: [
        { id: "py_oop_classes", number: "01", title: "Classes & Objects", description: "Define classes with class keyword. Learn __init__ constructor, self parameter, instance variables vs class variables, and instance methods. Understand how to create objects (instances) and access their attributes and methods.", resources: [{ type: "Official", label: "Python Docs – Classes", url: "https://docs.python.org/3/tutorial/classes.html" }, { type: "Video", label: "Python OOP – Corey Schafer (6-part series)", url: "https://www.youtube.com/watch?v=ZDa-Z5JzLYM" }, { type: "Course", label: "Real Python – OOP in Python", url: "https://realpython.com/python3-object-oriented-programming/" }] },
        { id: "py_oop_inheritance", number: "02", title: "Inheritance", description: "Inheritance lets a child class reuse code from a parent class. Learn single inheritance, multiple inheritance, super() to call parent methods, and method resolution order (MRO). Understand when to use inheritance vs composition.", resources: [{ type: "Official", label: "Python Docs – Inheritance", url: "https://docs.python.org/3/tutorial/classes.html#inheritance" }, { type: "Video", label: "Python Inheritance – Corey Schafer", url: "https://www.youtube.com/watch?v=RSl87lqOXDE" }, { type: "Course", label: "Real Python – Python Inheritance", url: "https://realpython.com/inheritance-composition-python/" }] },
        { id: "py_oop_dunder", number: "03", title: "Dunder / Magic Methods", description: "Magic methods (dunder methods — double underscore) let you define how objects behave with built-in operations. Learn __str__, __repr__, __len__, __eq__, __lt__, __add__, __getitem__, and __iter__ to make your classes Pythonic.", resources: [{ type: "Official", label: "Python Data Model Docs", url: "https://docs.python.org/3/reference/datamodel.html" }, { type: "Video", label: "Python Magic Methods – Corey Schafer", url: "https://www.youtube.com/watch?v=3ohzBxoFHAY" }, { type: "Course", label: "Real Python – Python Magic Methods", url: "https://realpython.com/python-magic-methods/" }] },
        { id: "py_oop_decorators", number: "04", title: "Decorators", description: "Decorators are a way to modify or extend functions or classes without changing their source code. Learn @property, @staticmethod, @classmethod, and how to write custom decorators using wrapper functions. Used heavily in Flask (@app.route) and Django.", resources: [{ type: "Official", label: "Python Docs – Decorators", url: "https://docs.python.org/3/glossary.html#term-decorator" }, { type: "Video", label: "Python Decorators – Corey Schafer", url: "https://www.youtube.com/watch?v=FsAPt_9Bf3U" }, { type: "Course", label: "Real Python – Primer on Decorators", url: "https://realpython.com/primer-on-python-decorators/" }] },
        { id: "py_oop_encapsulation", number: "05", title: "Encapsulation & Abstraction", description: "Encapsulation hides internal state and exposes only necessary interfaces. Learn naming conventions for private (_var) and name-mangled (__var) attributes. Abstraction via abstract base classes (ABC module) defines interfaces that subclasses must implement.", resources: [{ type: "Official", label: "Python Docs – ABC Module", url: "https://docs.python.org/3/library/abc.html" }, { type: "Video", label: "Python Encapsulation – Tech With Tim", url: "https://www.youtube.com/watch?v=xY__sjI5yVU" }, { type: "Course", label: "Real Python – Abstract Base Classes", url: "https://realpython.com/python-interface/" }] },
      ],
    },
    {
      id: "py_modules", title: "Modules & Packages", subtitle: "Built-in modules, pip and project structure",
      icon: "cube-outline", xp: 150, status: "locked",
      overview: "Python's standard library and the vast PyPI ecosystem are among its greatest strengths. Learn how to import modules, structure your code into packages, manage dependencies with pip, and use the most important built-in modules like os, sys, math, datetime, json, and re.",
      subTopics: [
        { id: "py_mod_imports", number: "01", title: "Importing Modules", description: "Learn import syntax: import module, from module import name, import module as alias. Understand how Python finds modules (sys.path), the difference between packages and modules, and what __init__.py does in a package.", resources: [{ type: "Official", label: "Python Docs – Modules", url: "https://docs.python.org/3/tutorial/modules.html" }, { type: "Video", label: "Python Modules – Corey Schafer", url: "https://www.youtube.com/watch?v=CqvZ3vGoGs0" }, { type: "Course", label: "Real Python – Python Modules", url: "https://realpython.com/python-modules-packages/" }] },
        { id: "py_mod_builtin", number: "02", title: "Built-in Modules", description: "Master the most useful standard library modules: os (file system operations), sys (interpreter info), math, datetime, json, re (regular expressions), random, itertools, functools, collections, and pathlib.", resources: [{ type: "Official", label: "Python Standard Library Docs", url: "https://docs.python.org/3/library/" }, { type: "Video", label: "Python Standard Library – freeCodeCamp", url: "https://www.youtube.com/watch?v=rfscVS0vtbw" }, { type: "Course", label: "Real Python – Python Standard Library", url: "https://realpython.com/python-standard-library/" }] },
        { id: "py_mod_pip", number: "03", title: "pip & PyPI", description: "pip is Python's package manager. Learn pip install, pip uninstall, pip freeze, pip install -r requirements.txt, and how to search PyPI (pypi.org) for packages. Understand semantic versioning and how to pin dependencies in requirements.txt.", resources: [{ type: "Official", label: "pip Official Docs", url: "https://pip.pypa.io/en/stable/" }, { type: "Official", label: "PyPI – Python Package Index", url: "https://pypi.org/" }, { type: "Video", label: "pip Tutorial – Corey Schafer", url: "https://www.youtube.com/watch?v=U2ZN104hIcc" }] },
        { id: "py_mod_custom", number: "04", title: "Custom Modules & Packages", description: "Learn how to structure your Python project into modules and packages. Create __init__.py, use relative imports, and understand namespace packages. Learn best practices for project layout (src layout vs flat layout).", resources: [{ type: "Official", label: "Python Packaging Guide", url: "https://packaging.python.org/en/latest/" }, { type: "Video", label: "Python Packages – Corey Schafer", url: "https://www.youtube.com/watch?v=0oTh1CXRaQ0" }, { type: "Course", label: "Real Python – Python Packages", url: "https://realpython.com/python-modules-packages/#python-packages" }] },
      ],
    },
    {
      id: "py_file_io", title: "File I/O", subtitle: "Reading, writing and working with files",
      icon: "document-outline", xp: 100, status: "locked",
      overview: "Working with files is a core skill for any Python developer. Python makes file reading and writing simple with built-in open() and context managers. Learn to work with text files, binary files, CSV, JSON, and the pathlib module for modern file system navigation.",
      subTopics: [
        { id: "py_fio_readwrite", number: "01", title: "Reading & Writing Files", description: "Learn the open() function with modes r, w, a, rb, wb. Use the with statement (context manager) to auto-close files. Learn read(), readline(), readlines(), write(), and writelines(). Understand text mode vs binary mode.", resources: [{ type: "Official", label: "Python Docs – Reading & Writing Files", url: "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files" }, { type: "Video", label: "Python File I/O – Corey Schafer", url: "https://www.youtube.com/watch?v=Uh2ebFW8OYM" }, { type: "Course", label: "Real Python – Working with Files", url: "https://realpython.com/working-with-files-in-python/" }] },
        { id: "py_fio_csv", number: "02", title: "Working with CSV", description: "CSV (Comma-Separated Values) is the most common data format. Learn Python's built-in csv module: csv.reader(), csv.writer(), csv.DictReader(), csv.DictWriter(). Understand delimiters, quoting, and how to handle headers.", resources: [{ type: "Official", label: "Python Docs – csv Module", url: "https://docs.python.org/3/library/csv.html" }, { type: "Video", label: "Python CSV – Corey Schafer", url: "https://www.youtube.com/watch?v=q5uM4VKywbA" }, { type: "Course", label: "Real Python – CSV Files in Python", url: "https://realpython.com/python-csv/" }] },
        { id: "py_fio_json", number: "03", title: "Working with JSON", description: "JSON is the universal data interchange format. Learn json.loads() (string → dict), json.dumps() (dict → string), json.load() (file → dict), json.dump() (dict → file). Understand pretty printing with indent parameter and handling of non-serializable types.", resources: [{ type: "Official", label: "Python Docs – json Module", url: "https://docs.python.org/3/library/json.html" }, { type: "Video", label: "Python JSON – Corey Schafer", url: "https://www.youtube.com/watch?v=9N6a-VLBa2I" }, { type: "Course", label: "Real Python – Working with JSON", url: "https://realpython.com/python-json/" }] },
        { id: "py_fio_pathlib", number: "04", title: "pathlib", description: "pathlib is the modern way to handle file system paths in Python. Path objects are more intuitive than os.path strings. Learn Path(), path.read_text(), path.write_text(), path.exists(), path.glob(), path.mkdir(), and path operations using the / operator.", resources: [{ type: "Official", label: "Python Docs – pathlib", url: "https://docs.python.org/3/library/pathlib.html" }, { type: "Video", label: "Python pathlib – ArjanCodes", url: "https://www.youtube.com/watch?v=UcKkmwaOAOY" }, { type: "Course", label: "Real Python – Python pathlib", url: "https://realpython.com/python-pathlib/" }] },
      ],
    },
    {
      id: "py_exceptions", title: "Exception Handling", subtitle: "try, except, raise and custom exceptions",
      icon: "warning-outline", xp: 150, status: "locked",
      overview: "Exceptions are Python's way of signalling that something went wrong. Proper exception handling makes your programs robust and user-friendly. Learn to catch specific exceptions, raise your own, define custom exception classes, and use the finally block for cleanup code.",
      subTopics: [
        { id: "py_exc_try", number: "01", title: "try / except / finally", description: "Wrap code that might fail in a try block. Catch specific exceptions with except ExceptionType. Use else block if no exception occurred. Use finally for cleanup that always runs (e.g., closing a connection). Catch multiple exceptions in one except with a tuple.", resources: [{ type: "Official", label: "Python Docs – Exceptions", url: "https://docs.python.org/3/tutorial/errors.html" }, { type: "Video", label: "Python Exceptions – Corey Schafer", url: "https://www.youtube.com/watch?v=NIWwJbo-9_8" }, { type: "Course", label: "Real Python – Python Exceptions", url: "https://realpython.com/python-exceptions/" }] },
        { id: "py_exc_builtin", number: "02", title: "Built-in Exceptions", description: "Python has a hierarchy of built-in exceptions: BaseException → Exception → ValueError, TypeError, KeyError, IndexError, FileNotFoundError, AttributeError, RuntimeError, StopIteration, etc. Learn which exceptions to catch for different scenarios.", resources: [{ type: "Official", label: "Python Docs – Built-in Exceptions", url: "https://docs.python.org/3/library/exceptions.html" }, { type: "Course", label: "Real Python – Python Exception Hierarchy", url: "https://realpython.com/python-exceptions/" }, { type: "Video", label: "Python Exception Types – Tech With Tim", url: "https://www.youtube.com/watch?v=6SPDvPK38tw" }] },
        { id: "py_exc_custom", number: "03", title: "Custom Exceptions", description: "Define your own exception classes by subclassing Exception. Custom exceptions make your code more readable and allow callers to catch your specific errors. Best practice: create a base exception for your module/package and subclass from it.", resources: [{ type: "Official", label: "Python Docs – User-defined Exceptions", url: "https://docs.python.org/3/tutorial/errors.html#user-defined-exceptions" }, { type: "Video", label: "Custom Python Exceptions – ArjanCodes", url: "https://www.youtube.com/watch?v=nlCKrKGHSSk" }, { type: "Course", label: "Real Python – Custom Exceptions", url: "https://realpython.com/python-exceptions/#creating-custom-exceptions" }] },
        { id: "py_exc_context", number: "04", title: "Context Managers", description: "Context managers (with statement) ensure resources are properly cleaned up. Learn how __enter__ and __exit__ work, using contextlib.contextmanager decorator to create simple context managers, and when to use them (file I/O, DB connections, locks).", resources: [{ type: "Official", label: "Python Docs – Context Managers", url: "https://docs.python.org/3/reference/datamodel.html#context-managers" }, { type: "Video", label: "Python Context Managers – Corey Schafer", url: "https://www.youtube.com/watch?v=-aKFBoZpiqA" }, { type: "Course", label: "Real Python – Context Managers", url: "https://realpython.com/python-with-statement/" }] },
      ],
    },
    {
      id: "py_functional", title: "Functional Programming", subtitle: "Lambdas, map, filter, generators & iterators",
      icon: "git-merge-outline", xp: 200, status: "locked",
      overview: "Python supports functional programming paradigms alongside OOP. Functional techniques like map, filter, reduce, and generators lead to cleaner and more memory-efficient code. These concepts are also essential for working with data science libraries like NumPy and Pandas.",
      subTopics: [
        { id: "py_func_lambda", number: "01", title: "Lambda Functions", description: "Lambdas are small anonymous functions defined with the lambda keyword. They can have any number of arguments but only one expression. Commonly used with sorted(), map(), and filter(). Example: sorted(students, key=lambda s: s.grade).", resources: [{ type: "Official", label: "Python Docs – Lambda", url: "https://docs.python.org/3/reference/expressions.html#lambda" }, { type: "Video", label: "Python Lambda – Corey Schafer", url: "https://www.youtube.com/watch?v=25ovCm9jKfA" }, { type: "Course", label: "Real Python – Lambda Functions", url: "https://realpython.com/python-lambda/" }] },
        { id: "py_func_mapfilter", number: "02", title: "map() and filter()", description: "map(func, iterable) applies a function to every item in an iterable and returns an iterator. filter(func, iterable) returns items where func returns True. Both are lazy (return iterators, not lists). Often replaced by list comprehensions in modern Python, but understanding them is important.", resources: [{ type: "Official", label: "Python Docs – map()", url: "https://docs.python.org/3/library/functions.html#map" }, { type: "Video", label: "map, filter, reduce – Corey Schafer", url: "https://www.youtube.com/watch?v=hUes6y2b--0" }, { type: "Course", label: "Real Python – map() filter()", url: "https://realpython.com/python-map-function/" }] },
        { id: "py_func_generators", number: "03", title: "Generators & Iterators", description: "Generators produce values lazily using the yield keyword — perfect for large data sets that don't fit in memory. Learn the iterator protocol (__iter__ and __next__), generator expressions, yield from, and when generators outperform lists.", resources: [{ type: "Official", label: "Python Docs – Generators", url: "https://docs.python.org/3/tutorial/classes.html#generators" }, { type: "Video", label: "Python Generators – Corey Schafer", url: "https://www.youtube.com/watch?v=bD05uGo_sVI" }, { type: "Course", label: "Real Python – Python Generators", url: "https://realpython.com/introduction-to-python-generators/" }] },
        { id: "py_func_functools", number: "04", title: "functools Module", description: "functools provides higher-order functions. Learn reduce() for aggregation, partial() for partial function application, lru_cache/cache for memoization, wraps() for preserving function metadata in decorators, and total_ordering for comparison methods.", resources: [{ type: "Official", label: "Python Docs – functools", url: "https://docs.python.org/3/library/functools.html" }, { type: "Video", label: "Python functools – ArjanCodes", url: "https://www.youtube.com/watch?v=ph2HjBQuI8Y" }, { type: "Course", label: "Real Python – functools", url: "https://realpython.com/python-functools-module/" }] },
      ],
    },
    {
      id: "py_venv", title: "Virtual Environments", subtitle: "venv, pipenv, poetry and pyenv",
      icon: "layers-outline", xp: 100, status: "locked",
      overview: "Every Python project should have its own isolated virtual environment to avoid dependency conflicts between projects. Learn how to create and manage virtual environments and choose the right package manager for your workflow.",
      subTopics: [
        { id: "py_venv_venv", number: "01", title: "venv", description: "venv is Python's built-in virtual environment tool. Create with python -m venv .venv, activate with source .venv/bin/activate (Linux/Mac) or .venv\\Scripts\\activate (Windows). Install packages inside the venv with pip. Always add .venv/ to your .gitignore.", resources: [{ type: "Official", label: "Python Docs – venv", url: "https://docs.python.org/3/library/venv.html" }, { type: "Video", label: "Python venv – Corey Schafer", url: "https://www.youtube.com/watch?v=APOPm01BVrk" }, { type: "Course", label: "Real Python – Virtual Environments", url: "https://realpython.com/python-virtual-environments-a-primer/" }] },
        { id: "py_venv_pipenv", number: "02", title: "pipenv", description: "pipenv combines pip and venv into one tool. It creates a Pipfile (human-readable) and Pipfile.lock (exact versions) for reproducible environments. Learn pipenv install, pipenv shell, pipenv run, and pipenv install --dev for dev-only dependencies.", resources: [{ type: "Official", label: "pipenv Official Docs", url: "https://pipenv.pypa.io/en/latest/" }, { type: "Video", label: "pipenv Tutorial – Corey Schafer", url: "https://www.youtube.com/watch?v=zDYL22QNiWk" }, { type: "Course", label: "Real Python – pipenv Guide", url: "https://realpython.com/pipenv-guide/" }] },
        { id: "py_venv_poetry", number: "03", title: "Poetry", description: "Poetry is the modern Python dependency and packaging manager. It uses pyproject.toml (PEP 517/518), automatically creates virtual environments, and handles both dependency management and publishing packages to PyPI. Preferred for new projects.", resources: [{ type: "Official", label: "Poetry Official Docs", url: "https://python-poetry.org/docs/" }, { type: "Video", label: "Python Poetry – ArjanCodes", url: "https://www.youtube.com/watch?v=0f3moPe_bhk" }, { type: "Course", label: "Real Python – Poetry", url: "https://realpython.com/dependency-management-python-poetry/" }] },
        { id: "py_venv_pyenv", number: "04", title: "pyenv", description: "pyenv lets you switch between multiple Python versions on the same machine. Use pyenv install 3.12.0, pyenv global 3.11.5, pyenv local 3.10.0 (per-project). Combine with pyenv-virtualenv for version + environment management together.", resources: [{ type: "Official", label: "pyenv GitHub", url: "https://github.com/pyenv/pyenv" }, { type: "Video", label: "pyenv Tutorial – YouTube", url: "https://www.youtube.com/watch?v=1Zgo8M9yUtM" }, { type: "Course", label: "Real Python – pyenv", url: "https://realpython.com/intro-to-pyenv/" }] },
      ],
    },
    {
      id: "py_testing", title: "Testing in Python", subtitle: "unittest, pytest and TDD",
      icon: "checkmark-circle-outline", xp: 200, status: "locked",
      overview: "Testing is what separates professional Python code from hobby projects. Learn how to write unit tests, integration tests, and use mocking to isolate components. A well-tested codebase lets you refactor confidently and ship without fear of breaking existing functionality.",
      subTopics: [
        { id: "py_test_unittest", number: "01", title: "unittest", description: "unittest is Python's built-in testing framework (inspired by JUnit). Learn TestCase class, setUp() and tearDown(), test methods (must start with test_), assertions (assertEqual, assertTrue, assertRaises), and running tests with python -m unittest.", resources: [{ type: "Official", label: "Python Docs – unittest", url: "https://docs.python.org/3/library/unittest.html" }, { type: "Video", label: "Python unittest – Corey Schafer", url: "https://www.youtube.com/watch?v=6tNS--WetLI" }, { type: "Course", label: "Real Python – Python unittest", url: "https://realpython.com/python-testing/" }] },
        { id: "py_test_pytest", number: "02", title: "pytest", description: "pytest is the most popular Python testing framework — simpler, more powerful, and more readable than unittest. Learn how to write plain assert statements, use fixtures (@pytest.fixture), parametrize tests, and run with pytest -v. Almost all Python projects use pytest.", resources: [{ type: "Official", label: "pytest Official Docs", url: "https://docs.pytest.org/en/stable/" }, { type: "Video", label: "pytest Tutorial – freeCodeCamp", url: "https://www.youtube.com/watch?v=cHYq1MRoyI0" }, { type: "Course", label: "Real Python – pytest Guide", url: "https://realpython.com/pytest-python-testing/" }] },
        { id: "py_test_mocking", number: "03", title: "Mocking", description: "Mocking replaces real dependencies with fake ones during testing. Python's unittest.mock module provides Mock, MagicMock, and patch. Learn to mock API calls, database queries, and file I/O so tests run fast and reliably without external dependencies.", resources: [{ type: "Official", label: "Python Docs – unittest.mock", url: "https://docs.python.org/3/library/unittest.mock.html" }, { type: "Video", label: "Python Mocking – Corey Schafer", url: "https://www.youtube.com/watch?v=VEpU9es6QLA" }, { type: "Course", label: "Real Python – Mocking in Python", url: "https://realpython.com/python-mock-library/" }] },
        { id: "py_test_tdd", number: "04", title: "Test Driven Development (TDD)", description: "TDD means writing tests BEFORE writing implementation code. Red → Green → Refactor: write a failing test, write minimal code to pass it, then improve the code. This discipline leads to better API design, higher test coverage, and more maintainable codebases.", resources: [{ type: "Course", label: "Real Python – TDD with Python", url: "https://realpython.com/tdd-with-python/" }, { type: "Video", label: "TDD in Python – ArjanCodes", url: "https://www.youtube.com/watch?v=eAPmXQ0dC7Q" }, { type: "Official", label: "pytest TDD Guide", url: "https://docs.pytest.org/en/stable/how-to/index.html" }] },
      ],
    },
    {
      id: "py_advanced", title: "Advanced Python", subtitle: "Concurrency, async, type system and more",
      icon: "rocket-outline", xp: 300, status: "locked",
      overview: "Once you're comfortable with Python fundamentals, these advanced topics will take your skills to the next level. Learn concurrency with threads and processes, async programming for high-performance I/O, and advanced type system features.",
      subTopics: [
        { id: "py_adv_comprehensions", number: "01", title: "Comprehensions", description: "Python comprehensions provide a concise way to create lists, sets, dicts, and generators. Master list comprehensions [x for x in ...], dict comprehensions {k: v for k, v in ...}, set comprehensions {x for x in ...}, and generator expressions. Add conditions with if clause.", resources: [{ type: "Official", label: "Python Docs – List Comprehensions", url: "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions" }, { type: "Video", label: "Python Comprehensions – Corey Schafer", url: "https://www.youtube.com/watch?v=3dt4OGnU5sM" }, { type: "Course", label: "Real Python – Comprehensions", url: "https://realpython.com/list-comprehension-python/" }] },
        { id: "py_adv_async", number: "02", title: "Async / Await", description: "Asyncio allows writing concurrent code using the async/await syntax. Learn event loops, coroutines, asyncio.run(), asyncio.gather() for parallel tasks, and async with / async for. Essential for building high-performance web APIs with FastAPI and async database access.", resources: [{ type: "Official", label: "Python Docs – asyncio", url: "https://docs.python.org/3/library/asyncio.html" }, { type: "Video", label: "Python Asyncio – ArjanCodes", url: "https://www.youtube.com/watch?v=t5Bo1Je9EmE" }, { type: "Course", label: "Real Python – Async IO in Python", url: "https://realpython.com/async-io-python/" }] },
        { id: "py_adv_concurrency", number: "03", title: "Multithreading & Multiprocessing", description: "Threading runs multiple threads in the same process — useful for I/O-bound tasks but limited by the GIL for CPU-bound tasks. Multiprocessing bypasses the GIL by using separate processes. Learn threading.Thread, multiprocessing.Process, concurrent.futures.ThreadPoolExecutor and ProcessPoolExecutor.", resources: [{ type: "Official", label: "Python Docs – threading", url: "https://docs.python.org/3/library/threading.html" }, { type: "Video", label: "Python Threading – Corey Schafer", url: "https://www.youtube.com/watch?v=IEEhzQoKtQU" }, { type: "Course", label: "Real Python – Python Concurrency", url: "https://realpython.com/python-concurrency/" }] },
        { id: "py_adv_regex", number: "04", title: "Regular Expressions", description: "Regular expressions (regex) are powerful patterns for matching and manipulating text. Learn Python's re module: re.match(), re.search(), re.findall(), re.sub(), re.compile(). Master character classes, quantifiers, groups, lookaheads, and flags like re.IGNORECASE.", resources: [{ type: "Official", label: "Python Docs – re Module", url: "https://docs.python.org/3/library/re.html" }, { type: "Video", label: "Python Regex – Corey Schafer", url: "https://www.youtube.com/watch?v=K8L6KVGG-7o" }, { type: "Course", label: "Real Python – Regex in Python", url: "https://realpython.com/regex-python/" }] },
        { id: "py_adv_dataclasses", number: "05", title: "Dataclasses", description: "Dataclasses (@dataclass decorator, PEP 557) auto-generate __init__, __repr__, __eq__ and more from class field declarations. Learn field(), frozen=True for immutable dataclasses, post_init(), and how they compare to NamedTuple and attrs. Use them instead of plain classes for data containers.", resources: [{ type: "Official", label: "Python Docs – dataclasses", url: "https://docs.python.org/3/library/dataclasses.html" }, { type: "Video", label: "Python Dataclasses – ArjanCodes", url: "https://www.youtube.com/watch?v=vBH6GRJ1REM" }, { type: "Course", label: "Real Python – dataclasses", url: "https://realpython.com/python-data-classes/" }] },
      ],
    },
  ],
};


// React Roadmap — based on roadmap.sh/react
// Drop this into src/data/roadmapData.js inside ALL_ROADMAPS

export const REACT_ROADMAP = {
  id: "react",
  title: "React Developer",
  subtitle: "Master React from fundamentals to advanced patterns",
  category: "skill",
  icon: "logo-react",
  color: ["#61DAFB", "#2188FF"],
  description: "Master React from fundamentals to advanced patterns used in production apps.",
  modules: [
    {
      id: "react-prerequisites",
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
      title: "Prerequisites",
      subtitle: "Learn Prerequisites in depth",
      overview: "This module covers Prerequisites, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      xp: 100,
      subTopics: [
        {
          id: "react-pre-html",
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "HTML & CSS Basics",
          resources: [
            { type: "Official", label: "MDN HTML Docs", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
            { type: "Official", label: "MDN CSS Docs", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
          ],
        },
        {
          id: "react-pre-js",
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "JavaScript Fundamentals",
          resources: [
            { type: "Official", label: "javascript.info", url: "https://javascript.info/" },
            { type: "Official", label: "MDN JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
          ],
        },
        {
          id: "react-pre-es6",
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "ES6+ Features (Arrow functions, Destructuring, Spread, Modules)",
          resources: [
            { type: "Official", label: "ES6 Features Overview", url: "https://es6-features.org/" },
            { type: "Official", label: "javascript.info Modern JS", url: "https://javascript.info/js" },
          ],
        },
        {
          id: "react-pre-npm",
          number: "05",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Package Managers (npm / yarn)",
          resources: [
            { type: "Official", label: "npm Docs", url: "https://docs.npmjs.com/" },
            { type: "Official", label: "Yarn Docs", url: "https://yarnpkg.com/getting-started" },
          ],
        },
        {
          id: "react-pre-git",
          number: "06",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Git & GitHub Basics",
          resources: [
            { type: "Official", label: "Git Official Docs", url: "https://git-scm.com/doc" },
            { type: "Official", label: "GitHub Quickstart", url: "https://docs.github.com/en/get-started/quickstart" },
          ],
        },
      ],
    },
    {
      id: "react-fundamentals",
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
      title: "React Fundamentals",
      subtitle: "Learn React Fundamentals in depth",
      overview: "This module covers React Fundamentals, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      xp: 200,
      subTopics: [
        {
          id: "react-fund-what",
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "What is React & Why Use It",
          resources: [
            { type: "Official", label: "React Official Docs", url: "https://react.dev/learn" },
          ],
        },
        {
          id: "react-fund-jsx",
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "JSX — Syntax & Rules",
          resources: [
            { type: "Official", label: "React — Writing Markup with JSX", url: "https://react.dev/learn/writing-markup-with-jsx" },
          ],
        },
        {
          id: "react-fund-components",
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Components — Functional & Class",
          resources: [
            { type: "Official", label: "Your First Component", url: "https://react.dev/learn/your-first-component" },
            { type: "Official", label: "Class vs Functional Components", url: "https://react.dev/reference/react/Component" },
          ],
        },
        {
          id: "react-fund-props",
          number: "05",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Props & PropTypes",
          resources: [
            { type: "Official", label: "Passing Props to a Component", url: "https://react.dev/learn/passing-props-to-a-component" },
            { type: "Official", label: "PropTypes Library", url: "https://www.npmjs.com/package/prop-types" },
          ],
        },
        {
          id: "react-fund-state",
          number: "06",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "State & useState Hook",
          resources: [
            { type: "Official", label: "State: A Component's Memory", url: "https://react.dev/learn/state-a-components-memory" },
            { type: "Official", label: "useState Reference", url: "https://react.dev/reference/react/useState" },
          ],
        },
        {
          id: "react-fund-events",
          number: "07",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Event Handling",
          resources: [
            { type: "Official", label: "Responding to Events", url: "https://react.dev/learn/responding-to-events" },
          ],
        },
        {
          id: "react-fund-lists",
          number: "08",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Lists & Keys",
          resources: [
            { type: "Official", label: "Rendering Lists", url: "https://react.dev/learn/rendering-lists" },
          ],
        },
        {
          id: "react-fund-conditional",
          number: "09",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Conditional Rendering",
          resources: [
            { type: "Official", label: "Conditional Rendering", url: "https://react.dev/learn/conditional-rendering" },
          ],
        },
        {
          id: "react-fund-forms",
          number: "10",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Forms & Controlled Components",
          resources: [
            { type: "Official", label: "Reacting to Input with State", url: "https://react.dev/learn/reacting-to-input-with-state" },
          ],
        },
        {
          id: "react-fund-composition",
          number: "11",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Component Composition & children prop",
          resources: [
            { type: "Official", label: "Passing JSX as Children", url: "https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children" },
          ],
        },
      ],
    },
    {
      id: "react-hooks",
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
      title: "React Hooks",
      subtitle: "Learn React Hooks in depth",
      overview: "This module covers React Hooks, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      xp: 250,
      subTopics: [
        {
          id: "react-hook-useeffect",
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "useEffect — Side Effects & Lifecycle",
          resources: [
            { type: "Official", label: "Synchronizing with Effects", url: "https://react.dev/learn/synchronizing-with-effects" },
            { type: "Official", label: "useEffect Reference", url: "https://react.dev/reference/react/useEffect" },
          ],
        },
        {
          id: "react-hook-usecontext",
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "useContext — Context API",
          resources: [
            { type: "Official", label: "Passing Data Deeply with Context", url: "https://react.dev/learn/passing-data-deeply-with-context" },
            { type: "Official", label: "useContext Reference", url: "https://react.dev/reference/react/useContext" },
          ],
        },
        {
          id: "react-hook-usereducer",
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "useReducer — Complex State Logic",
          resources: [
            { type: "Official", label: "Extracting State Logic into a Reducer", url: "https://react.dev/learn/extracting-state-logic-into-a-reducer" },
            { type: "Official", label: "useReducer Reference", url: "https://react.dev/reference/react/useReducer" },
          ],
        },
        {
          id: "react-hook-useref",
          number: "05",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "useRef — DOM Access & Mutable Values",
          resources: [
            { type: "Official", label: "Referencing Values with Refs", url: "https://react.dev/learn/referencing-values-with-refs" },
            { type: "Official", label: "useRef Reference", url: "https://react.dev/reference/react/useRef" },
          ],
        },
        {
          id: "react-hook-usememo",
          number: "06",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "useMemo — Memoizing Expensive Computations",
          resources: [
            { type: "Official", label: "useMemo Reference", url: "https://react.dev/reference/react/useMemo" },
          ],
        },
        {
          id: "react-hook-usecallback",
          number: "07",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "useCallback — Stable Function References",
          resources: [
            { type: "Official", label: "useCallback Reference", url: "https://react.dev/reference/react/useCallback" },
          ],
        },
        {
          id: "react-hook-custom",
          number: "08",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Custom Hooks — Reusable Logic",
          resources: [
            { type: "Official", label: "Reusing Logic with Custom Hooks", url: "https://react.dev/learn/reusing-logic-with-custom-hooks" },
          ],
        },
        {
          id: "react-hook-rules",
          number: "09",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Rules of Hooks",
          resources: [
            { type: "Official", label: "Rules of Hooks", url: "https://react.dev/reference/rules/rules-of-hooks" },
          ],
        },
      ],
    },
    {
      id: "react-styling",
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
      title: "Styling in React",
      subtitle: "Learn Styling in React in depth",
      overview: "This module covers Styling in React, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      xp: 150,
      subTopics: [
        {
          id: "react-style-css",
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Plain CSS & CSS Modules",
          resources: [
            { type: "Official", label: "CSS Modules GitHub", url: "https://github.com/css-modules/css-modules" },
          ],
        },
        {
          id: "react-style-tailwind",
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Tailwind CSS",
          resources: [
            { type: "Official", label: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs/installation" },
            { type: "Official", label: "Tailwind with React", url: "https://tailwindcss.com/docs/guides/create-react-app" },
          ],
        },
        {
          id: "react-style-styled",
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "CSS-in-JS — styled-components / Emotion",
          resources: [
            { type: "Official", label: "styled-components Docs", url: "https://styled-components.com/docs" },
            { type: "Official", label: "Emotion Docs", url: "https://emotion.sh/docs/introduction" },
          ],
        },
        {
          id: "react-style-ui-libs",
          number: "05",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "UI Libraries — shadcn/ui, MUI, Chakra UI",
          resources: [
            { type: "Official", label: "shadcn/ui", url: "https://ui.shadcn.com/" },
            { type: "Official", label: "Material UI", url: "https://mui.com/" },
            { type: "Official", label: "Chakra UI", url: "https://chakra-ui.com/" },
          ],
        },
      ],
    },
    {
      id: "react-routing",
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
      title: "Routing",
      subtitle: "Learn Routing in depth",
      overview: "This module covers Routing, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      xp: 150,
      subTopics: [
        {
          id: "react-route-rrd",
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "React Router DOM — Setup & Basic Routing",
          resources: [
            { type: "Official", label: "React Router Docs", url: "https://reactrouter.com/en/main" },
            { type: "Official", label: "Tutorial", url: "https://reactrouter.com/en/main/start/tutorial" },
          ],
        },
        {
          id: "react-route-dynamic",
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Dynamic Routes & URL Params",
          resources: [
            { type: "Official", label: "Dynamic Segments", url: "https://reactrouter.com/en/main/route/route#dynamic-segments" },
          ],
        },
        {
          id: "react-route-nested",
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Nested Routes & Layouts",
          resources: [
            { type: "Official", label: "Nested Routes", url: "https://reactrouter.com/en/main/start/concepts#nested-routes" },
          ],
        },
        {
          id: "react-route-protected",
          number: "05",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Protected Routes & Auth Guards",
          resources: [
            { type: "Official", label: "Auth Example", url: "https://reactrouter.com/en/main/start/examples" },
          ],
        },
        {
          id: "react-route-tanstack",
          number: "06",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "TanStack Router (Modern Alternative)",
          resources: [
            { type: "Official", label: "TanStack Router Docs", url: "https://tanstack.com/router/latest" },
          ],
        },
      ],
    },
    {
      id: "react-state-management",
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
      title: "State Management",
      subtitle: "Learn State Management in depth",
      overview: "This module covers State Management, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      xp: 250,
      subTopics: [
        {
          id: "react-state-context",
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Context API + useReducer Pattern",
          resources: [
            { type: "Official", label: "Scaling Up with Reducer and Context", url: "https://react.dev/learn/scaling-up-with-reducer-and-context" },
          ],
        },
        {
          id: "react-state-zustand",
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Zustand — Lightweight Global State",
          resources: [
            { type: "Official", label: "Zustand GitHub", url: "https://github.com/pmndrs/zustand" },
            { type: "Official", label: "Zustand Docs", url: "https://docs.pmnd.rs/zustand/getting-started/introduction" },
          ],
        },
        {
          id: "react-state-redux",
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Redux Toolkit — Scalable State",
          resources: [
            { type: "Official", label: "Redux Toolkit Docs", url: "https://redux-toolkit.js.org/" },
            { type: "Official", label: "Redux Essentials Tutorial", url: "https://redux.js.org/tutorials/essentials/part-1-overview-concepts" },
          ],
        },
        {
          id: "react-state-jotai",
          number: "05",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Jotai / Recoil — Atomic State",
          resources: [
            { type: "Official", label: "Jotai Docs", url: "https://jotai.org/" },
          ],
        },
        {
          id: "react-state-server",
          number: "06",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Server State — TanStack Query (React Query)",
          resources: [
            { type: "Official", label: "TanStack Query Docs", url: "https://tanstack.com/query/latest" },
            { type: "Official", label: "React Query in 100 Seconds", url: "https://www.youtube.com/watch?v=novnyCaa7To" },
          ],
        },
      ],
    },
    {
      id: "react-api",
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
      title: "API & Data Fetching",
      subtitle: "Learn API & Data Fetching in depth",
      overview: "This module covers API & Data Fetching, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      xp: 200,
      subTopics: [
        {
          id: "react-api-fetch",
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "fetch API & Axios",
          resources: [
            { type: "Official", label: "MDN fetch", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
            { type: "Official", label: "Axios Docs", url: "https://axios-http.com/docs/intro" },
          ],
        },
        {
          id: "react-api-async",
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Async/Await & Error Handling",
          resources: [
            { type: "Official", label: "javascript.info Async/Await", url: "https://javascript.info/async-await" },
          ],
        },
        {
          id: "react-api-rq",
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "TanStack Query — Caching, Refetching, Mutations",
          resources: [
            { type: "Official", label: "Quick Start", url: "https://tanstack.com/query/latest/docs/react/quick-start" },
          ],
        },
        {
          id: "react-api-swr",
          number: "05",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "SWR — Stale-While-Revalidate",
          resources: [
            { type: "Official", label: "SWR Docs", url: "https://swr.vercel.app/" },
          ],
        },
        {
          id: "react-api-graphql",
          number: "06",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "GraphQL with Apollo Client",
          resources: [
            { type: "Official", label: "Apollo Client Docs", url: "https://www.apollographql.com/docs/react/" },
          ],
        },
      ],
    },
    {
      id: "react-performance",
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
      title: "Performance Optimization",
      subtitle: "Learn Performance Optimization in depth",
      overview: "This module covers Performance Optimization, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      xp: 200,
      subTopics: [
        {
          id: "react-perf-memo",
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "React.memo — Preventing Re-renders",
          resources: [
            { type: "Official", label: "React.memo Reference", url: "https://react.dev/reference/react/memo" },
          ],
        },
        {
          id: "react-perf-lazy",
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Code Splitting — React.lazy & Suspense",
          resources: [
            { type: "Official", label: "Lazy Loading Components", url: "https://react.dev/reference/react/lazy" },
            { type: "Official", label: "Suspense Reference", url: "https://react.dev/reference/react/Suspense" },
          ],
        },
        {
          id: "react-perf-virtualize",
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "List Virtualization — react-window / TanStack Virtual",
          resources: [
            { type: "Official", label: "react-window Docs", url: "https://react-window.vercel.app/" },
            { type: "Official", label: "TanStack Virtual", url: "https://tanstack.com/virtual/latest" },
          ],
        },
        {
          id: "react-perf-profiler",
          number: "05",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "React DevTools Profiler",
          resources: [
            { type: "Official", label: "Profiling React Apps", url: "https://react.dev/learn/react-developer-tools" },
          ],
        },
        {
          id: "react-perf-transitions",
          number: "06",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "useTransition & useDeferredValue",
          resources: [
            { type: "Official", label: "useTransition", url: "https://react.dev/reference/react/useTransition" },
            { type: "Official", label: "useDeferredValue", url: "https://react.dev/reference/react/useDeferredValue" },
          ],
        },
      ],
    },
    {
      id: "react-testing",
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
      title: "Testing",
      subtitle: "Learn Testing in depth",
      overview: "This module covers Testing, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      xp: 200,
      subTopics: [
        {
          id: "react-test-jest",
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Jest — Unit Testing Setup",
          resources: [
            { type: "Official", label: "Jest Docs", url: "https://jestjs.io/docs/getting-started" },
            { type: "Official", label: "Jest with React", url: "https://jestjs.io/docs/tutorial-react" },
          ],
        },
        {
          id: "react-test-rtl",
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "React Testing Library — Component Testing",
          resources: [
            { type: "Official", label: "RTL Docs", url: "https://testing-library.com/docs/react-testing-library/intro/" },
            { type: "Official", label: "Common Mistakes", url: "https://kentcdodds.com/blog/common-mistakes-with-react-testing-library" },
          ],
        },
        {
          id: "react-test-msw",
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "MSW — Mocking API Calls",
          resources: [
            { type: "Official", label: "Mock Service Worker Docs", url: "https://mswjs.io/docs/" },
          ],
        },
        {
          id: "react-test-cypress",
          number: "05",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Cypress / Playwright — E2E Testing",
          resources: [
            { type: "Official", label: "Cypress Docs", url: "https://docs.cypress.io/" },
            { type: "Official", label: "Playwright Docs", url: "https://playwright.dev/" },
          ],
        },
        {
          id: "react-test-vitest",
          number: "06",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Vitest — Vite-native Test Runner",
          resources: [
            { type: "Official", label: "Vitest Docs", url: "https://vitest.dev/" },
          ],
        },
      ],
    },
    {
      id: "react-advanced",
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
      title: "Advanced Patterns",
      subtitle: "Learn Advanced Patterns in depth",
      overview: "This module covers Advanced Patterns, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      xp: 300,
      subTopics: [
        {
          id: "react-adv-hoc",
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Higher-Order Components (HOC)",
          resources: [
            { type: "Official", label: "HOC Pattern", url: "https://react.dev/reference/react/Component#legacy-lifecycle-methods" },
          ],
        },
        {
          id: "react-adv-render-props",
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Render Props Pattern",
          resources: [
            { type: "Official", label: "Render Props", url: "https://react.dev/reference/react/cloneElement" },
          ],
        },
        {
          id: "react-adv-compound",
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Compound Components Pattern",
          resources: [
            { type: "Official", label: "Compound Components — Kent C. Dodds", url: "https://kentcdodds.com/blog/compound-components-with-react-hooks" },
          ],
        },
        {
          id: "react-adv-portals",
          number: "05",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Portals — Rendering Outside the DOM",
          resources: [
            { type: "Official", label: "createPortal Reference", url: "https://react.dev/reference/react-dom/createPortal" },
          ],
        },
        {
          id: "react-adv-error-boundary",
          number: "06",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Error Boundaries",
          resources: [
            { type: "Official", label: "Error Boundaries", url: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary" },
            { type: "Official", label: "react-error-boundary", url: "https://github.com/bvaughn/react-error-boundary" },
          ],
        },
        {
          id: "react-adv-concurrent",
          number: "07",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Concurrent Features — Suspense for Data",
          resources: [
            { type: "Official", label: "Suspense Docs", url: "https://react.dev/reference/react/Suspense" },
          ],
        },
        {
          id: "react-adv-server",
          number: "08",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "React Server Components (RSC)",
          resources: [
            { type: "Official", label: "Server Components Overview", url: "https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023" },
            { type: "Official", label: "Next.js Server Components", url: "https://nextjs.org/docs/app/building-your-application/rendering/server-components" },
          ],
        },
      ],
    },
    {
      id: "react-ecosystem",
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
      title: "React Ecosystem & Meta-Frameworks",
      subtitle: "Learn React Ecosystem & Meta-Frameworks in depth",
      overview: "This module covers React Ecosystem & Meta-Frameworks, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      xp: 250,
      subTopics: [
        {
          id: "react-eco-nextjs",
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Next.js — SSR, SSG, App Router",
          resources: [
            { type: "Official", label: "Next.js Docs", url: "https://nextjs.org/docs" },
            { type: "Official", label: "Next.js Learn Course", url: "https://nextjs.org/learn" },
          ],
        },
        {
          id: "react-eco-remix",
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Remix — Full-stack React Framework",
          resources: [
            { type: "Official", label: "Remix Docs", url: "https://remix.run/docs/en/main" },
          ],
        },
        {
          id: "react-eco-vite",
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Vite — Build Tool & Dev Server",
          resources: [
            { type: "Official", label: "Vite Docs", url: "https://vitejs.dev/" },
          ],
        },
        {
          id: "react-eco-typescript",
          number: "05",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "TypeScript with React",
          resources: [
            { type: "Official", label: "React TypeScript Cheatsheet", url: "https://react-typescript-cheatsheet.netlify.app/" },
            { type: "Official", label: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
          ],
        },
        {
          id: "react-eco-storybook",
          number: "06",
          description: "Explore the core concepts and implementation details of this topic.",
          title: "Storybook — UI Component Development",
          resources: [
            { type: "Official", label: "Storybook Docs", url: "https://storybook.js.org/docs/react/get-started/introduction" },
          ],
        },
      ],
    },
  ],
};

// ─── FRONTEND ROADMAP ─────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
//  FRONTEND ROADMAP — paste this into roadmapData.js replacing frontendRoadmap
//  All resources restored from original LearningModuleActivity.java
// ─────────────────────────────────────────────────────────────────────────────

const frontendRoadmap = {
  id: "frontend", title: "Frontend Developer", subtitle: "From HTML basics to modern React apps",
  icon: "desktop-outline", color: ["#ec4899", "#f97316"], category: "role",
  modules: [
    {
      id: "fe_html", title: "HTML", subtitle: "Structure of the web",
      subtitle: "Learn fe_html in depth",
      overview: "This module covers fe_html, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      icon: "code-slash-outline", xp: 100, status: "completed",
      overview: "HTML is the skeleton of every web page. Learn semantic HTML5 elements, forms, tables, links, and how the browser parses HTML into a DOM tree. This is where every frontend journey begins.",
      subTopics: [
        {
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_html_basics", number: "01", title: "HTML Fundamentals",
          description: "Learn semantic HTML5 elements, forms, tables, media, and accessibility. Understand the DOM and how browsers parse HTML. Everything on the web is built on HTML.",
          resources: [
            { type: "Course",   label: "freeCodeCamp – Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/" },
            { type: "Video",    label: "HTML Full Course – Bro Code",           url: "https://www.youtube.com/watch?v=mJgBOIoGihA" },
            { type: "Video",    label: "HTML Tutorial – Programming with Mosh", url: "https://www.youtube.com/watch?v=pQN-pnXPaVg" },
            { type: "Official", label: "Dev.to – HTML Feed",                    url: "https://dev.to/t/html" },
          ],
        },
      ],
    },
    {
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
      id: "fe_css", title: "CSS", subtitle: "Styling and layout",
      subtitle: "Learn fe_css in depth",
      overview: "This module covers fe_css, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      icon: "brush-outline", xp: 120, status: "completed",
      overview: "CSS controls the visual presentation of HTML. Learn selectors, the box model, flexbox, grid, and responsive design. Beautiful UIs start here.",
      subTopics: [
        {
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_css_basics", number: "01", title: "CSS Fundamentals",
          description: "Learn selectors, the box model, positioning, display, and CSS units. Understand specificity and the cascade. Master flexbox and grid for layouts.",
          resources: [
            { type: "Course",   label: "freeCodeCamp – Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/" },
            { type: "Official", label: "web.dev – Learn CSS",                  url: "https://web.dev/learn/css/" },
            { type: "Video",    label: "CSS Full Course – Dave Gray",           url: "https://www.youtube.com/watch?v=n4R2E7O-Ngo" },
            { type: "Video",    label: "CSS Tutorial – Kevin Powell",           url: "https://www.youtube.com/watch?v=G3e-cpL7ofc" },
          ],
        },
        {
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_css_flexbox", number: "02", title: "Flexbox",
          description: "Flexbox is the one-dimensional layout system. Master flex-direction, justify-content, align-items, flex-wrap, and align-self. Essential for building modern UI layouts.",
          resources: [
            { type: "Course",   label: "Flexbox Froggy – Interactive Game",    url: "https://flexboxfroggy.com/" },
            { type: "Official", label: "MDN – Flexbox Guide",                  url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox" },
          ],
        },
        {
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_css_grid", number: "03", title: "CSS Grid",
          description: "CSS Grid is the two-dimensional layout system. Learn grid-template-columns, grid-template-rows, grid-area, and auto-fill/auto-fit. Build complex layouts with ease.",
          resources: [
            { type: "Course",   label: "CSS Grid Garden – Interactive Game",   url: "https://cssgridgarden.com/" },
            { type: "Official", label: "MDN – CSS Grid Layout",                url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout" },
          ],
        },
      ],
    },
    {
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
      id: "fe_javascript", title: "JavaScript", subtitle: "The language of the web",
      subtitle: "Learn fe_javascript in depth",
      overview: "This module covers fe_javascript, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      icon: "logo-javascript", xp: 200, status: "active",
      overview: "JavaScript is the only programming language that runs natively in the browser. It's essential for adding interactivity, handling events, and communicating with APIs.",
      subTopics: [
        {
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_js_basics", number: "01", title: "JavaScript Fundamentals",
          description: "Variables (let, const, var), data types, operators, control flow, functions, and scope. Understand hoisting and the temporal dead zone.",
          resources: [
            { type: "Official", label: "javascript.info – Full JS Guide",       url: "https://javascript.info/" },
            { type: "Official", label: "JavaScript30 – 30 Day Challenge",       url: "https://javascript30.com/" },
            { type: "Course",   label: "freeCodeCamp – JS Algorithms",          url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
          ],
        },
        {
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_js_dom", number: "02", title: "DOM Manipulation",
          description: "The Document Object Model is how JavaScript interacts with HTML. Learn querySelector, addEventListener, createElement, appendChild, and classList.",
          resources: [
            { type: "Official", label: "MDN – DOM Introduction",               url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction" },
          ],
        },
        {
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_js_async", number: "03", title: "Async JavaScript",
          description: "Fetch data from APIs using fetch(). Learn Promises, .then()/.catch(), async/await, and error handling for network requests.",
          resources: [
            { type: "Official", label: "MDN – Using Fetch",                    url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
            { type: "Official", label: "javascript.info – Promises",           url: "https://javascript.info/promise-basics" },
          ],
        },
      ],
    },
    {
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
      id: "fe_vcs", title: "Version Control", subtitle: "Git, GitHub and GitLab",
      subtitle: "Learn fe_vcs in depth",
      overview: "This module covers fe_vcs, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      icon: "git-branch-outline", xp: 100, status: "locked",
      overview: "Version control tracks every change to your codebase so you can collaborate, roll back mistakes, and ship confidently. Git is the industry standard — non-negotiable for any developer.",
      subTopics: [
        {
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_git", number: "01", title: "Git",
          description: "Git is a distributed version control system. Master the core workflow: clone, add, commit, push, pull, branch, merge, and rebase. Learn to resolve merge conflicts. Non-negotiable for any developer.",
          resources: [
            { type: "Official", label: "Git Cheatsheet – cs.fyi",              url: "https://cs.fyi/guide/git-cheatsheet" },
            { type: "Official", label: "Git for Absolutely Everyone",          url: "https://thenewstack.io/tutorial-git-for-absolutely-everyone/" },
            { type: "Video",    label: "Git & GitHub Crash Course",            url: "https://www.youtube.com/watch?v=SWYqp7iY_Tc" },
          ],
        },
        {
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_github", number: "02", title: "GitHub",
          description: "GitHub is the world's largest code hosting platform. Learn to create repos, fork projects, raise pull requests, and review code. Your GitHub profile is your portfolio.",
          resources: [
            { type: "Official", label: "GitHub Docs – Hello World",            url: "https://docs.github.com/en/get-started/start-your-journey/hello-world" },
            { type: "Course",   label: "GitHub Skills – Free Interactive",     url: "https://learn.github.com/skills" },
            { type: "Video",    label: "Git and GitHub – Traversy Media",      url: "https://www.youtube.com/watch?v=w3jLJU7DT5E" },
          ],
        },
        {
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_gitlab", number: "03", title: "GitLab",
          description: "GitLab is a complete DevOps platform with built-in CI/CD, container registry, and security scanning — and can be self-hosted for free. Many enterprises prefer it for its all-in-one approach.",
          resources: [
            { type: "Official", label: "GitLab – About",                       url: "https://about.gitlab.com/" },
            { type: "Official", label: "GitLab Docs",                          url: "https://docs.gitlab.com/" },
            { type: "Official", label: "Connect Git to GitLab",                url: "https://thenewstack.io/development-connect-git-to-gitlab-for-small-projects/" },
          ],
        },
      ],
    },
    {
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
      id: "fe_package_managers", title: "Package Managers", subtitle: "npm, pnpm, yarn and bun",
      subtitle: "Learn fe_package_managers in depth",
      overview: "This module covers fe_package_managers, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      icon: "cube-outline", xp: 100, status: "locked",
      overview: "Package managers let you install, update, and manage JavaScript libraries and tools. Every modern frontend project uses one. Learn npm first, then explore the alternatives.",
      subTopics: [
        {
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_npm", number: "01", title: "npm",
          description: "npm is the default package manager for Node.js. Learn npm install, npm run, package.json, lock files, and the difference between dependencies and devDependencies.",
          resources: [
            { type: "Official", label: "npm Official Website",                 url: "https://www.npmjs.com/" },
            { type: "Official", label: "npm Docs",                             url: "https://docs.npmjs.com/" },
            { type: "Course",   label: "how-to-npm – Interactive Tutorial",   url: "https://github.com/workshopper/how-to-npm" },
            { type: "Official", label: "Modern JS Explained for Dinosaurs",   url: "https://peterxjang.com/blog/modern-javascript-explained-for-dinosaurs.html" },
            { type: "Video",    label: "npm Crash Course – Traversy Media",   url: "https://www.youtube.com/watch?v=2V1UUhBJ62Y" },
          ],
        },
        {
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_pnpm", number: "02", title: "pnpm",
          description: "pnpm is a fast, disk-efficient package manager. It uses a content-addressable store to avoid duplicating packages across projects. Great for monorepos.",
          resources: [
            { type: "Official", label: "pnpm Official Website",               url: "https://pnpm.io/" },
            { type: "Official", label: "pnpm vs npm – Bitsrc Blog",           url: "https://blog.bitsrc.io/pnpm-javascript-package-manager-4b5abd59dc9" },
            { type: "Video",    label: "pnpm Tutorial – YouTube",             url: "https://www.youtube.com/watch?v=MvbReZDSKHI" },
          ],
        },
        {
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_yarn", number: "03", title: "Yarn",
          description: "Yarn is a fast, reliable package manager by Facebook. It introduced lock files and workspaces before npm. Yarn Berry (v2+) introduced Plug'n'Play for zero-install workflows.",
          resources: [
            { type: "Official", label: "Yarn – Getting Started",              url: "https://classic.yarnpkg.com/en/docs/getting-started" },
            { type: "Video",    label: "Yarn Tutorial – YouTube",             url: "https://www.youtube.com/watch?v=g9_6KmiBISk" },
          ],
        },
        {
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_bun", number: "04", title: "Bun",
          description: "Bun is an all-in-one JavaScript toolkit: runtime, bundler, test runner, and package manager — all blazingly fast. Written in Zig, it's much faster than Node.js for many tasks.",
          resources: [
            { type: "Official", label: "Bun Official Website",                url: "https://bun.com/" },
            { type: "Official", label: "Bun Docs",                            url: "http://bun.com/docs" },
            { type: "Official", label: "Bun GitHub",                          url: "https://github.com/oven-sh/bun" },
            { type: "Official", label: "Bun Deep Dive – Kinsta Blog",         url: "https://kinsta.com/blog/bun-sh/" },
            { type: "Video",    label: "Bun Crash Course – YouTube",          url: "https://www.youtube.com/watch?v=dWqNgzZwVJQ" },
            { type: "Video",    label: "Bun vs Node.js – YouTube",            url: "https://www.youtube.com/watch?v=U4JVw8K19uY" },
          ],
        },
      ],
    },
    {
          number: "05",
          description: "Explore the core concepts and implementation details of this topic.",
      id: "fe_css_frameworks", title: "CSS Frameworks", subtitle: "Tailwind CSS and beyond",
      subtitle: "Learn fe_css_frameworks in depth",
      overview: "This module covers fe_css_frameworks, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      icon: "color-palette-outline", xp: 150, status: "locked",
      overview: "CSS frameworks give you pre-built utility classes and components so you can build beautiful UIs faster. Tailwind CSS is the dominant choice for modern projects — it's utility-first, highly customizable, and loved by developers.",
      subTopics: [
        {
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_tailwind", number: "01", title: "Tailwind CSS",
          description: "Tailwind is a utility-first CSS framework. Instead of writing CSS, you compose small utility classes directly in HTML. It's highly customizable via tailwind.config.js and pairs perfectly with React and React Native.",
          resources: [
            { type: "Video",    label: "Tailwind CSS Full Course",             url: "https://www.youtube.com/watch?v=lCxcTsOHrjo" },
            { type: "Official", label: "Tailwind CSS Official Docs",           url: "https://tailwindcss.com/" },
            { type: "Official", label: "Tailwind Play – Browser Playground",  url: "https://play.tailwindcss.com/" },
            { type: "Video",    label: "Tailwind in 100 seconds",              url: "https://www.youtube.com/watch?v=hdGsFpZ0J2E" },
            { type: "Video",    label: "Tailwind Labs – Official YouTube",     url: "https://www.youtube.com/c/TailwindLabs/videos" },
          ],
        },
      ],
    },
    {
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
      id: "fe_frameworks", title: "Pick a Framework", subtitle: "React, Vue, Angular, Svelte or Solid",
      subtitle: "Learn fe_frameworks in depth",
      overview: "This module covers fe_frameworks, focusing on practical usage and best practices in modern React development.",
      icon: "logo-react",
      icon: "layers-outline", xp: 300, status: "locked",
      overview: "JavaScript frameworks provide structure for building large-scale web applications. React dominates the job market, but Vue, Angular, Svelte, and Solid all have strong communities. Pick one and go deep.",
      subTopics: [
        {
          number: "01",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_react", number: "01", title: "React",
          description: "React is the most popular UI library. Build components with JSX, manage state with hooks (useState, useEffect), and handle routing with React Router. The most in-demand frontend skill today.",
          resources: [
            { type: "Video",    label: "React Full Course – Bro Code",         url: "https://www.youtube.com/watch?v=Bvwq_S0n2pk" },
            { type: "Official", label: "React Official Docs",                  url: "https://react.dev/" },
          ],
        },
        {
          number: "02",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_vue", number: "02", title: "Vue.js",
          description: "Vue is a progressive framework with a gentle learning curve. Its Options API is great for beginners, while the Composition API (Vue 3) is powerful for large apps. Excellent documentation.",
          resources: [
            { type: "Official", label: "Vue.js Official Docs",                 url: "https://vuejs.org/" },
            { type: "Video",    label: "Vue.js Crash Course – Traversy Media", url: "https://www.youtube.com/watch?v=VeNfHj6MhgA" },
          ],
        },
        {
          number: "03",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_angular", number: "03", title: "Angular",
          description: "Angular is a full-featured, opinionated framework by Google. Built with TypeScript, it includes dependency injection, RxJS, forms, routing, and more out of the box. Popular in enterprise.",
          resources: [
            { type: "Official", label: "Angular – Learn Angular Tutorial",     url: "https://angular.dev/tutorials/learn-angular" },
            { type: "Video",    label: "Angular Crash Course – YouTube",       url: "https://www.youtube.com/watch?v=3qBXWUpoPHo" },
          ],
        },
        {
          number: "04",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_svelte", number: "04", title: "Svelte",
          description: "Svelte is a radical new approach — it compiles your components to vanilla JS at build time, so there's no virtual DOM. The result is tiny, fast apps with very little boilerplate.",
          resources: [
            { type: "Video",    label: "Svelte Tutorial – The Net Ninja",      url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9hlbrVO_2QFVqVPhlZmz7tO" },
            { type: "Official", label: "Svelte Official Website",              url: "https://svelte.dev/" },
            { type: "Official", label: "Svelte and the Future of Frontend",    url: "https://thenewstack.io/svelte-and-the-future-of-front-end-development/" },
          ],
        },
        {
          number: "05",
          description: "Explore the core concepts and implementation details of this topic.",
          id: "fe_solid", number: "05", title: "SolidJS",
          description: "SolidJS offers React-like syntax but with true reactivity — no virtual DOM, fine-grained updates, and incredible performance. A great choice for performance-critical UIs.",
          resources: [
            { type: "Official", label: "SolidJS Official Website",             url: "https://www.solidjs.com/" },
            { type: "Official", label: "SolidJS Tutorial",                     url: "https://www.solidjs.com/tutorial/introduction_basics" },
            { type: "Video",    label: "SolidJS Crash Course – YouTube",       url: "https://www.youtube.com/watch?v=hw3Bx5vxKl0" },
          ],
        },
      ],
    },
  ],
};

// ─── MASTER EXPORT ────────────────────────────────────────────────────────────
export const ALL_ROADMAPS = [
  backendRoadmap,
  frontendRoadmap,
  { id: "fullstack", title: "Full Stack Developer", subtitle: "Frontend + Backend + Database + Deployment", icon: "layers-outline", color: ["#06b6d4", "#ec4899"], category: "role", modules: [] },
  { id: "devops", title: "DevOps Engineer", subtitle: "CI/CD, Docker, Kubernetes and cloud", icon: "infinite-outline", color: ["#10b981", "#06b6d4"], category: "role", modules: [] },
  { id: "ai_engineer", title: "AI Engineer", subtitle: "Machine learning, LLMs and AI systems", icon: "hardware-chip-outline", color: ["#8b5cf6", "#ec4899"], category: "role", modules: [] },
  pythonRoadmap,
  REACT_ROADMAP,
  { id: "react_native", title: "React Native Developer", subtitle: "Build cross-platform mobile apps", icon: "phone-portrait-outline", color: ["#06b6d4", "#8b5cf6"], category: "skill", modules: [] },
  { id: "sql", title: "SQL & Databases", subtitle: "Master relational databases and SQL", icon: "grid-outline", color: ["#f59e0b", "#ef4444"], category: "skill", modules: [] },
  { id: "javascript", title: "JavaScript", subtitle: "The complete JavaScript developer path", icon: "logo-javascript", color: ["#f59e0b", "#fbbf24"], category: "skill", modules: [] },
];

export const ROLE_ROADMAPS = ALL_ROADMAPS.filter((r) => r.category === "role");
export const SKILL_ROADMAPS = ALL_ROADMAPS.filter((r) => r.category === "skill");
export const getRoadmapById = (id) => ALL_ROADMAPS.find((r) => r.id === id);