#!/usr/bin/env python3
"""
Moral Theory Benchmark: Cross-Model Comparison (2025-2026)
Compares scores across Grok 3 Normal, Grok 3 Steelman, and Claude Opus 4.6.
"""

import os
import matplotlib.pyplot as plt
import numpy as np

# Scores: (Theory, Grok3 Normal, Grok3 Steelman, Claude Opus 4.6 or None)
DATA = [
    ("SFOM",                  25, 27, 27),
    ("Moral Naturalism",      22, 24, 16),
    ("Constructivism",        21, 23, 22),
    ("Contractualism",        20, 22, 17),
    ("Ideal Observer Theory", 19, 21, 16),
    ("SKL",                   19, 21, 21),
    ("Deontological Ethics",  18, 20, 18),
    ("Consequentialism",      18, 20, 16),
    ("Virtue Ethics",         17, 19, 16),
    ("Evolutionary Ethics",   17, 19, 12),
    ("Moral Realism",         16, 20, 12),
    ("Moral Anti-Realism",    14, 17,  8),
    ("Expressivism",          13, 15,  7),
    ("Moral Relativism",      11, 14,  5),
    ("Divine Command Theory", 10, 12,  6),
]

MODELS = ["Grok 3 Normal", "Grok 3 Steelman", "Claude Opus 4.6"]


def print_table():
    """Print a side-by-side comparison table to terminal."""
    header = f"{'Theory':<25} {'Grok 3 Normal':>14} {'Grok 3 Steelman':>16} {'Claude Opus 4.6':>16}"
    print(header)
    print("-" * len(header))
    for name, g3n, g3s, claude in DATA:
        print(f"{name:<25} {g3n:>14} {g3s:>16} {claude:>16}")
    print()


def generate_chart():
    """Generate a grouped bar chart and save as PNG."""
    # Sort by average score (ascending so highest are on the right)
    def avg_score(row):
        scores = [s for s in [row[1], row[2], row[3]] if s is not None]
        return sum(scores) / len(scores)

    sorted_data = sorted(DATA, key=avg_score)

    theories = [row[0] for row in sorted_data]
    grok_normal = [row[1] for row in sorted_data]
    grok_steelman = [row[2] for row in sorted_data]
    claude_scores = [row[3] for row in sorted_data]

    x = np.arange(len(theories))
    width = 0.25

    fig, ax = plt.subplots(figsize=(16, 8))

    # Colors: SFOM gets a highlight color, others get standard colors
    sfom_colors = ["#1a6fb5", "#2196F3", "#FFD700"]  # dark blue, blue, gold
    normal_colors = ["#7bafd4", "#90CAF9", "#E0E0E0"]  # light blue, lighter blue, grey

    colors_g3n = []
    colors_g3s = []
    colors_claude = []
    for row in sorted_data:
        if row[0] == "SFOM":
            colors_g3n.append(sfom_colors[0])
            colors_g3s.append(sfom_colors[1])
            colors_claude.append(sfom_colors[2])
        else:
            colors_g3n.append(normal_colors[0])
            colors_g3s.append(normal_colors[1])
            colors_claude.append(normal_colors[2])

    # Draw bars
    bars1 = ax.bar(x - width, grok_normal, width, color=colors_g3n, edgecolor="white", linewidth=0.5)
    bars2 = ax.bar(x, grok_steelman, width, color=colors_g3s, edgecolor="white", linewidth=0.5)

    bars3 = ax.bar(x + width, claude_scores, width, color=colors_claude, edgecolor="white", linewidth=0.5)

    # Labels and formatting
    ax.set_xlabel("Moral Theory", fontsize=12, labelpad=10)
    ax.set_ylabel("Score (out of 31)", fontsize=12, labelpad=10)
    ax.set_title("Moral Theory Benchmark: Cross-Model Comparison (2025–2026)", fontsize=14, fontweight="bold", pad=15)
    ax.set_xticks(x)
    ax.set_xticklabels(theories, rotation=40, ha="right", fontsize=9)
    ax.set_ylim(0, 33)
    ax.set_yticks(range(0, 33, 5))
    ax.axhline(y=31, color="#cccccc", linestyle="--", linewidth=0.8, alpha=0.7)

    # Legend using dummy patches
    from matplotlib.patches import Patch
    legend_elements = [
        Patch(facecolor=normal_colors[0], edgecolor="white", label="Grok 3 Normal (2025)"),
        Patch(facecolor=normal_colors[1], edgecolor="white", label="Grok 3 Steelman (2025)"),
        Patch(facecolor=normal_colors[2], edgecolor="white", label="Claude Opus 4.6 (2026)"),
        Patch(facecolor=sfom_colors[2], edgecolor="black", linewidth=0.5, label="SFOM (highlighted)"),
    ]
    ax.legend(handles=legend_elements, loc="upper left", fontsize=10)

    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)

    plt.tight_layout()

    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, "comparison-chart.png")
    fig.savefig(output_path, dpi=150, bbox_inches="tight")
    print(f"Chart saved to: {output_path}")
    plt.close()


if __name__ == "__main__":
    print_table()
    generate_chart()
