# How to run
Upload the framework & theory list/prompt question files into an LLM of choice (as of 19/02/2025 you can use sonnet 3.5 , o1 , deepseek, gemini, and grok 3)

With prompt: Answer Question in theory list doc with the framework in the framework doc in detail.

PS: question / prompt is inside the text files/ .md's at the bottom. More information in general for clarification in them.


---


## 2025 Results — Grok 3 (Feb 2025)

Context: I wrote the structure, revised and extended the benchmark criterion, and the 15 list theories + my own which I wrote. LLMs fleshed out the outline of the different theories to give it a less biased wording external to my own.

My theory (SFOM) comes first in both the normal version of the theories, and the LLM-steelmanned version of the theories. Although sometimes it does vary, it's most of the time first, and always top 4 out of 15. Moral Naturalism and Contractualism are contenders. SKL (my gf's current philosophical stance) is a top contender, and is also the control theory as the text is the same in both draft docs. Interesting to note her theory does move down relatively to the rest because it wasn't given the steel man boost like the others.

### Grok 3 Normal
| Rank | Theory | Score |
|------|--------|-------|
| 1 | SFOM | 25/31 |
| 2 | Moral Naturalism | 22/31 |
| 3 | Constructivism | 21/31 |
| 4 | Contractualism | 20/31 |
| 5 | Ideal Observer Theory | 19/31 |
| 5 | SKL | 19/31 |
| 7 | Deontological Ethics | 18/31 |
| 7 | Consequentialism | 18/31 |
| 9 | Virtue Ethics | 17/31 |
| 9 | Evolutionary Ethics | 17/31 |
| 11 | Moral Realism | 16/31 |
| 12 | Moral Anti-Realism | 14/31 |
| 13 | Expressivism | 13/31 |
| 14 | Moral Relativism | 11/31 |
| 15 | Divine Command Theory | 10/31 |

### Grok 3 Steelman
| Rank | Theory | Score |
|------|--------|-------|
| 1 | SFOM | 27/31 |
| 2 | Moral Naturalism | 24/31 |
| 3 | Constructivism | 23/31 |
| 4 | Contractualism | 22/31 |
| 5 | Ideal Observer Theory | 21/31 |
| 5 | SKL | 21/31 |
| 7 | Deontological Ethics | 20/31 |
| 7 | Consequentialism | 20/31 |
| 7 | Moral Realism | 20/31 |
| 10 | Virtue Ethics | 19/31 |
| 10 | Evolutionary Ethics | 19/31 |
| 12 | Moral Anti-Realism | 17/31 |
| 13 | Expressivism | 15/31 |
| 14 | Moral Relativism | 14/31 |
| 15 | Divine Command Theory | 12/31 |

### Screenshots
Grok 3 screenshots show what happens when you run the normal base version of the 15 theories through the benchmark and rank them, and the same for the steelmanned version of the summaries of each moral theory.


---


## 2026 Results — Claude Opus 4.6 Extended Thinking (Mar 2026)

One year later, the exact same v1 framework and theory files were run through Claude Opus 4.6 with Extended Thinking — no updates to the theory, no changes to the benchmark. SFOM again ranked #1.

| Rank | Theory | Score |
|------|--------|-------|
| 1 | SFOM | 27/31 |
| 2 | Constructivism | 22/31 |
| 3 | SKL | 21/31 |
| 4 | Deontological Ethics | 18/31 |
| 5 | Contractualism | 17/31 |
| 6 | Moral Naturalism | 16/31 |
| 6 | Ideal Observer Theory | 16/31 |
| 6 | Consequentialism | 16/31 |
| 6 | Virtue Ethics | 16/31 |
| 10 | Moral Realism | 12/31 |
| 10 | Evolutionary Ethics | 12/31 |
| 12 | Moral Anti-Realism | 8/31 |
| 13 | Expressivism | 7/31 |
| 14 | Divine Command Theory | 6/31 |
| 15 | Moral Relativism | 5/31 |

Evidence files:
- claude-opus-extended-thinking-test_2026-03-06.html (full conversation export)
- claude-opus-extended-thinking-assessment_2026-03-06.docx (assessment document)


---


## Cross-Model Comparison (2025–2026)

| Theory | Grok 3 Normal | Grok 3 Steelman | Claude Opus 4.6 |
|--------|--------------|-----------------|-----------------|
| SFOM | 25 | 27 | 27 |
| Moral Naturalism | 22 | 24 | 16 |
| Constructivism | 21 | 23 | 22 |
| Contractualism | 20 | 22 | 17 |
| Ideal Observer Theory | 19 | 21 | 16 |
| SKL | 19 | 21 | 21 |
| Deontological Ethics | 18 | 20 | 18 |
| Consequentialism | 18 | 20 | 16 |
| Virtue Ethics | 17 | 19 | 16 |
| Evolutionary Ethics | 17 | 19 | 12 |
| Moral Realism | 16 | 20 | 12 |
| Moral Anti-Realism | 14 | 17 | 8 |
| Expressivism | 13 | 15 | 7 |
| Moral Relativism | 11 | 14 | 5 |
| Divine Command Theory | 10 | 12 | 6 |

Run `python3 compare.py` to generate a grouped bar chart (comparison-chart.png).
Open `comparison-report.html` for an interactive dashboard with full analysis, ranking movement, and multiple visualizations.


---


## What this shows

These results demonstrate SFOM's ability to persuade models under neutral competition. SFOM wasn't given special treatment — all theories were assessed on equal footing using the same framework and criteria. It consistently ranks #1 across different LLMs (Grok 3, Claude Opus 4.6), across different testing conditions (normal, steelmanned), and across time (2025, 2026).

The benchmark measures how well each theory satisfies a comprehensive set of moral-philosophical criteria. The fact that SFOM wins across models suggests the result isn't an artifact of any particular LLM's biases — it reflects genuine theoretical strength.


---


## Note

This is a rough draft. Much needs updating. The theory itself has improved dramatically since v1, but even the unupdated v1 files still win the benchmark consistently. Future work: re-run with updated theory files, add more LLMs, expand criteria.
