"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function DatabasesBasicsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 3 · 9 min read"
      titleMain="Database basics,"
      titleAccent="the place state actually lives."
      subtitle="Cookies and sessions point at server state. The server state itself almost always lives in a database. Two main shapes — relational and document — cover 99% of what you'll touch."
      backHref="/learn/web/unit-3"
      backLabel="Unit 3 · Scripting & Storage"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "Cookies, sessions & storage",
        href: "/learn/web/lessons/cookies-sessions-storage",
      }}
      nextLesson={{
        label: "Web security 101",
        href: "/learn/web/lessons/web-security",
      }}
    >
      <Section title="Relational vs document — pick relational by default" sectionNumber="01">
        <Code>{`Relational (SQL):
  PostgreSQL    — modern default; powerful, free, great
  MySQL / MariaDB — older default; still everywhere
  SQLite        — single-file; great for dev, embedded, small projects

Document (NoSQL):
  MongoDB       — JSON-shaped documents; flexible schema
  Firestore     — Google's hosted NoSQL with realtime sync
  DynamoDB      — AWS's serverless NoSQL`}</Code>
        <SubHeading className="mt-6">Which to pick</SubHeading>
        <P>
          For a new web app, default to <strong>PostgreSQL</strong>.
          Relational databases have stronger guarantees, a clearer query
          language, and the best tooling. Document databases shine when
          your data is naturally hierarchical (rare) or when you genuinely
          have no schema (rarer than people think).
        </P>
      </Section>

      <Section title="Tables, rows, and columns" sectionNumber="02">
        <P>
          A <strong>table</strong> is like a spreadsheet sheet. Each{" "}
          <strong>row</strong> is one record. Each{" "}
          <strong>column</strong> is one field with a defined type.
        </P>
        <Code>{`users
┌────┬─────────────────────┬─────────────┬─────────────────────┐
│ id │ email               │ name        │ created_at          │
├────┼─────────────────────┼─────────────┼─────────────────────┤
│  1 │ york@yorksims.com   │ York Sims   │ 2026-01-15 10:23:00 │
│  2 │ bob@example.com     │ Bob Smith   │ 2026-02-03 14:17:09 │
└────┴─────────────────────┴─────────────┴─────────────────────┘`}</Code>
        <P>
          One column is the <strong>primary key</strong> — usually an{" "}
          <Inline>id</Inline> that uniquely identifies each row. Other
          tables refer to it via{" "}
          <strong>foreign keys</strong>.
        </P>
      </Section>

      <Section title="SQL CRUD — the four operations" sectionNumber="03">
        <Code>{`-- CREATE
INSERT INTO users (email, name) VALUES ('york@yorksims.com', 'York');

-- READ
SELECT id, email FROM users WHERE name = 'York';
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;

-- UPDATE
UPDATE users SET name = 'York S.' WHERE id = 1;

-- DELETE
DELETE FROM users WHERE id = 1;`}</Code>
        <P>
          That&rsquo;s 95% of SQL. The other 5% is joins, indexes,
          aggregates, and views — which you learn as you need them.
        </P>
      </Section>

      <Section title="Joins — connecting tables" sectionNumber="04">
        <P>
          Most data has relationships. Users have orders, orders have
          line items, line items reference products. Joins combine
          related rows.
        </P>
        <Code>{`-- Show each order with its user's name
SELECT
  orders.id,
  orders.total,
  users.name
FROM orders
JOIN users ON users.id = orders.user_id
WHERE orders.status = 'paid';`}</Code>
        <P>
          Four kinds of join you&rsquo;ll see:
        </P>
        <Code>{`INNER JOIN  — only rows that match in both tables (default; the common case)
LEFT JOIN   — all rows from the left, matched rows from the right (NULL if no match)
RIGHT JOIN  — opposite of LEFT (rare in practice — just flip the tables)
FULL JOIN   — everything from both (rare)`}</Code>
      </Section>

      <Section title="Indexes — the difference between fast and slow" sectionNumber="05">
        <P>
          Without an index, finding a row means scanning every row in
          the table. Fine at 100 rows; lethal at 10M. An index is a
          sorted lookup structure that lets the database find rows
          quickly.
        </P>
        <Code>{`-- Probably your most-used column for lookups
CREATE INDEX idx_users_email ON users(email);

-- Composite — useful when you filter on both
CREATE INDEX idx_orders_user_status ON orders(user_id, status);`}</Code>
        <P>
          Rule of thumb: index the columns you put in{" "}
          <Inline>WHERE</Inline> clauses and the foreign-key columns
          you JOIN on. Indexes speed up reads but slow down writes (the
          DB has to update them too), so don&rsquo;t index everything.
        </P>
      </Section>

      <Section title="ORMs and query builders" sectionNumber="06">
        <P>
          An <strong>ORM</strong> (Object-Relational Mapper) lets you
          write database queries in your application language instead
          of raw SQL.
        </P>
        <Code>{`// Prisma — currently the popular Node ORM
const user = await prisma.user.findUnique({
  where: { email: "york@yorksims.com" },
  include: { orders: true },
});

// Drizzle — lighter alternative, closer to raw SQL
const user = await db
  .select()
  .from(users)
  .where(eq(users.email, "york@yorksims.com"));

// SQLAlchemy (Python)
user = session.query(User).filter_by(email="york@yorksims.com").first()`}</Code>
        <SubHeading className="mt-6">ORM or raw SQL?</SubHeading>
        <P>
          ORMs are great for type safety and 80% of CRUD. They&rsquo;re
          a leaky abstraction for complex queries — at some point
          you&rsquo;ll write a 7-table join the ORM can&rsquo;t express,
          and you&rsquo;ll drop down to SQL. That&rsquo;s fine. Most
          modern ORMs let you escape to raw SQL when needed.
        </P>
      </Section>

      <Section title="Connecting from your app" sectionNumber="07">
        <Code>{`// A typical Node.js + Postgres setup

import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Run a query
const result = await pool.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]   // <-- parameterized, NOT string-concatenated!
);
console.log(result.rows[0]);`}</Code>
        <SubHeading className="mt-6">Parameterized queries — non-negotiable</SubHeading>
        <P>
          See <Inline>$1</Inline> and the separate array argument?
          That&rsquo;s a <em>parameterized</em> query. The user input is
          sent to the database separately from the SQL — it can&rsquo;t
          change the structure of the query. This is the only thing
          standing between your app and SQL injection. We&rsquo;ll cover
          that — and a few of its friends — in the final lesson.
        </P>
      </Section>
    </LessonShell>
  );
}
