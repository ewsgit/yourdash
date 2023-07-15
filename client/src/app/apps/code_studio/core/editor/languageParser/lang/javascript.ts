import CodeStudioBaseLanguageParser from "../parser";
import Token from "../token";
import {TokenType} from "../tokenType";

export default class CodeStudioLanguageParser extends CodeStudioBaseLanguageParser {
  isInsideString: boolean;
  isSubProperty: boolean;

  constructor() {
    super("javascript");
    this.isSubProperty = false;
    this.isInsideString = false;
  }

  private tokenize(str: string) {
    let outputString = str;
    const outputToken = new Token("[ERR] tokenERR", TokenType.Plain);

    switch (true) {
      case str.startsWith("\""):
      case str.startsWith("\'"):
        outputString = str.slice(1);
        outputToken.value = str.slice(0, 1);
        outputToken.type = TokenType.String;
        this.isInsideString = !this.isInsideString;
        break;
      case this.isInsideString:
        outputString = str.slice(1);
        outputToken.value = str.slice(0, 1);
        outputToken.type = TokenType.String;
        break;
      case this.isSubProperty:
        outputString = str.slice(1);
        outputToken.value = str.slice(0, 1);
        outputToken.type = TokenType.Identifier;
        break;
      case str.startsWith("module"):
        outputString = str.slice(6);
        outputToken.value = "module";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith("export"):
        outputString = str.slice(6);
        outputToken.value = "export";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith("function"):
        outputString = str.slice(8);
        outputToken.value = "function";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith("import"):
        outputString = str.slice(6);
        outputToken.value = "import";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith("abstract"):
        outputString = str.slice(8);
        outputToken.value = "abstract";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith("return"):
        outputString = str.slice(6);
        outputToken.value = "return";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith("from"):
        outputString = str.slice(4);
        outputToken.value = "from";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith("const"):
        outputString = str.slice(5);
        outputToken.value = "const";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith("class"):
        outputString = str.slice(5);
        outputToken.value = "class";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith("var"):
        outputString = str.slice(3);
        outputToken.value = "var";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith("let"):
        outputString = str.slice(3);
        outputToken.value = "let";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith("console"):
        outputString = str.slice(7);
        outputToken.value = "console";
        outputToken.type = TokenType.Identifier;
        break;
      case str.startsWith("=>"):
        outputString = str.slice(2);
        outputToken.value = "=>";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === ".":
        outputString = str.slice(1);
        outputToken.value = ".";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === ";":
        outputString = str.slice(1);
        outputToken.value = ";";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === ":":
        outputString = str.slice(1);
        outputToken.value = ":";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "?":
        outputString = str.slice(1);
        outputToken.value = "?";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "|":
        outputString = str.slice(1);
        outputToken.value = "|";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === ",":
        outputString = str.slice(1);
        outputToken.value = ",";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "=":
        outputString = str.slice(1);
        outputToken.value = "=";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "+":
        outputString = str.slice(1);
        outputToken.value = "+";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "-":
        outputString = str.slice(1);
        outputToken.value = "-";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "/":
        outputString = str.slice(1);
        outputToken.value = "/";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "*":
        outputString = str.slice(1);
        outputToken.value = "*";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "^":
        outputString = str.slice(1);
        outputToken.value = "^";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "&":
        outputString = str.slice(1);
        outputToken.value = "&";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "%":
        outputString = str.slice(1);
        outputToken.value = "%";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "$":
        outputString = str.slice(1);
        outputToken.value = "$";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "!":
        outputString = str.slice(1);
        outputToken.value = "!";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "(":
        outputString = str.slice(1);
        outputToken.value = "(";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === ")":
        outputString = str.slice(1);
        outputToken.value = ")";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "[":
        outputString = str.slice(1);
        outputToken.value = "[";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "]":
        outputString = str.slice(1);
        outputToken.value = "]";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "{":
        outputString = str.slice(1);
        outputToken.value = "{";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "}":
        outputString = str.slice(1);
        outputToken.value = "}";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === "<":
        outputString = str.slice(1);
        outputToken.value = "<";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === ">":
        outputString = str.slice(1);
        outputToken.value = ">";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice(0, 1) === " ":
        outputString = str.slice(1);
        outputToken.value = " ";
        outputToken.type = TokenType.Plain;
        break;
      case str.slice(0, 1) === "\n":
        outputString = str.slice(1);
        outputToken.value = "\n";
        outputToken.type = TokenType.Plain;
        break;
      case str.slice(0, 1) === "\t":
        outputString = str.slice(1);
        outputToken.value = "\t";
        outputToken.type = TokenType.Plain;
        break;
      case str.slice(0, 1) === "0":
      case str.slice(0, 1) === "1":
      case str.slice(0, 1) === "2":
      case str.slice(0, 1) === "3":
      case str.slice(0, 1) === "4":
      case str.slice(0, 1) === "5":
      case str.slice(0, 1) === "6":
      case str.slice(0, 1) === "7":
      case str.slice(0, 1) === "8":
      case str.slice(0, 1) === "9":
        outputString = str.slice(1);
        outputToken.value = str.slice(0, 1);
        outputToken.type = TokenType.Number;
        break;
      default:
        outputString = str.slice(1);
        outputToken.value = str.slice(0, 1);
        outputToken.type = TokenType.Plain;
    }

    return {
      parsedToken: outputToken,
      remainingString: outputString
    };
  }

  private mergeTokens() {
    let didMatch = false;

    this.parsedTokens.map((token, ind) => {
      if (!this.parsedTokens[ind + 1]) {
        return "";
      }

      if (
        (
          this.parsedTokens[ind + 1].type === token.type &&
          this.parsedTokens[ind + 1].fontWeight === token.fontWeight
        ) ||
        this.parsedTokens[ind + 1].value === " " ||
        this.parsedTokens[ind + 1].value === "\t" ||
        this.parsedTokens[ind + 1].value === "\n"
      ) {
        token.value += this.parsedTokens[ind + 1].value;
        this.parsedTokens.splice(ind + 1, 1);
        didMatch = true;
      }

      return "";
    });

    if (didMatch) {
      this.mergeTokens();
    }
  }

  private tokenizeString(str: string) {
    const string = str;
    this.parsedTokens = [];

    if (string.length === 0) {
      return;
    }

    let tokenizeOutput = this.tokenize(string);
    this.parsedTokens.push(tokenizeOutput.parsedToken);

    while (tokenizeOutput.remainingString.length !== 0) {
      tokenizeOutput = this.tokenize(tokenizeOutput.remainingString);
      console.log(tokenizeOutput.remainingString);
      this.parsedTokens.push(tokenizeOutput.parsedToken);
    }

    this.mergeTokens();
  }

  parseString(str: string) {
    super.parseString(str);

    console.clear();

    this.tokenizeString(str);

    return this;
  }
}
