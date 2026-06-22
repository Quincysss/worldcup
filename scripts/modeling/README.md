# Modeling Helpers

This folder contains reusable, dependency-free model utilities.

## Poisson Score Matrix

Use `poisson.py` to convert two expected-goal values into:

- visible score matrix from 0-0 to 5-5 by default
- visible tail probability
- 1X2 probabilities
- over/under 1.5, 2.5, and 3.5
- top five scorelines

Example:

```powershell
python scripts\modeling\poisson.py --team-a Germany --team-b "Cote d'Ivoire" --lambda-a 1.95 --lambda-b 0.88
```

Downstream JS or Python scripts should import this module instead of duplicating Poisson math.
