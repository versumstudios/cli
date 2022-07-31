[![Join the community on GitHub Discussions](https://badgen.net/badge/join%20the%20discussion/on%20github/black?icon=github)](https://github.com/versumstudios/cli/discussions)

# @versumstudios/cli

The command-line interface for versum.

- [versum-cli](#versum-cli)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [How to use](#how-to-use)
    - [Export](#export)
    - [Templates](#templates)

## Usage

To install the latest version of Versum CLI, run this command:

```bash
npm i -g @versumstudios/cli
```

To get started run:

```bash
versum
```

## Contributing

- [Code of Conduct](https://github.com/versumstudios/cli/blob/main/CODE_OF_CONDUCT.md)
- [Contributing Guidelines](https://github.com/versumstudios/cli/blob/main/CONTRIBUTING.md)
- [Apache-2.0 License](https://github.com/versumstudios/cli/blob/main/LICENSE)

## How to use

```bash
versum -h
```

## Export

The versum CLI allows you to export several chunks of data into `.csv` files.

### Export `token-collectors`

```bash
versum export token-collectors
versum export token-collectors --contract KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW --token 0
```

### Export `wallet-collectors`

```bash
versum export wallet-collectors
versum export wallet-collectors --wallet tz1eht4WAjkqU7kaupJd8qCDmec9HuKfGf68
versum export wallet-collectors --wallet tz1eht4WAjkqU7kaupJd8qCDmec9HuKfGf68 --platform versum
```

## Templates

You can quickly generate new working folders from existing [templates](https://github.com/versumstudios/templates). This way you can start new projects without having to worry about boilerplate code.

```bash
versum template
versum template --template versum-web
versum template --template fxhash-gt
```
