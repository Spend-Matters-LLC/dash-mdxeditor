/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const webpack = require("webpack")
const WebpackDashDynamicImport = require("@plotly/webpack-dash-dynamic-import")
const packageJson = require("./package.json")

const dashLibraryName = packageJson.name.replace(/-/g, "_")

module.exports = (env, argv) => {
  let mode

  const overrides = module.exports || {}

  // if user specified mode flag take that value
  if (argv && argv.mode) {
    mode = argv.mode
  }

  // else if configuration object is already set (module.exports) use that value
  else if (overrides.mode) {
    mode = overrides.mode
  }

  // else take webpack default (production)
  else {
    mode = "production"
  }

  let filename = (overrides.output || {}).filename
  if (!filename) {
    const modeSuffix = mode === "development" ? "dev" : "min"
    filename = `${dashLibraryName}.${modeSuffix}.js`
  }

  const entry = overrides.entry || { main: "./src/lib/index.js" }

  const devtool = overrides.devtool || "source-map"

  const externals =
    "externals" in overrides
      ? overrides.externals
      : {
          react: "React",
          "react-dom": "ReactDOM",
          "plotly.js": "Plotly",
          "prop-types": "PropTypes",
        }

  return {
    mode,
    entry,
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    output: {
      path: path.resolve(__dirname, dashLibraryName),
      chunkFilename: "[name].js",
      filename,
      library: dashLibraryName,
      libraryTarget: "window",
    },
    devtool,
    externals,
    module: {
      rules: [
        {
          test: /\.js|\.jsx|\.ts|\.tsx$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader","css-loader"],
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          parallel: true,
          cache: "./.build_cache/terser",
          terserOptions: {
            warnings: false,
            ie8: false,
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          async: {
            chunks: "async",
            minSize: 0,
            name(module, chunks, cacheGroupKey) {
              return `${cacheGroupKey}-${chunks[0].name}`
            },
          },
          shared: {
            chunks: "all",
            minSize: 0,
            minChunks: 2,
            name: "dash_markdown_editor-shared",
          },
        },
      },
    },
    plugins: [
      new WebpackDashDynamicImport(),
      new webpack.SourceMapDevToolPlugin({
        filename: "[file].map",
        exclude: ["async-plotlyjs"],
      }),
    ],
  }
}
