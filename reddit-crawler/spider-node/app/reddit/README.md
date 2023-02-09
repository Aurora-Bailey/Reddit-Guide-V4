## About Reddit ids

A reddit id consists of 2 parts. The "t1\_" part and the base 36 number following it. All Reddit id's are sequential making t1_1 the first comment ever made (in theory).

## Reddit id prefix

- t1\_ Comment
- t2\_ Account
- t3\_ Link (posts)
- t4\_ Message
- t5\_ Subreddit
- t6\_ Award

## Reddit id string to number

```
parseInt(("t1_5yc1s").slice(3,-1), 36)
// 10000000
```

## Reddit id number to string

```
't1_' + (10000000).toString(36)
// t1_5yc1s
```
