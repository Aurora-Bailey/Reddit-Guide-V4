## About Reddit ids

A reddit id consists of 2 parts. The "t1\_" part and the base 36 number following it. All Reddit id's are sequential making t1_1 the first comment ever made (in theory).

## Reddit id prefix

t1* Comment
t2* Account
t3* Link
t4* Message
t5* Subreddit
t6* Award

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
