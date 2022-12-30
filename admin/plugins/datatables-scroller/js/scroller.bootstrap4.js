ground.css;
          if (bg.length === 9) {
            // Remove bg alpha channel if present
            return bg.substr(0, 7);
          }
          return bg;
        }
        return this._config.colors.foreground.css;
    }
  }

  private _resolveBackgroundRgba(bgColorMode: number, bgColor: number, inverse: boolean): number {
    switch (bgColorMode) {
      case Attributes.CM_P16:
      case Attributes.CM_P256:
        return this._getColorFromAnsiIndex(bgColor).rgba;
      case Attributes.CM_RGB:
        return bgColor << 8;
      case Attributes.CM_DEFAULT:
      default:
        if (inverse) {
          return this._config.colors.foreground.rgba;
        }
        return this._config.colors.background.rgba;
    }
  }

  private _resolveForegroundRgba(fgColorMode: number, fgColor: number, inverse: boolean, bold: boolean