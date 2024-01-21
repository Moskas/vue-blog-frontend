{
  description = "Node dev flake";

  inputs = { nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable"; };
  outputs = { self, nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in {
      devShell.x86_64-linux = pkgs.mkShell {
        buildInputs = with pkgs; [
          bun
          nodejs_21
          nodePackages_latest.vls
          nodePackages_latest.volar
          nodePackages_latest.prettier
          nodePackages_latest.eslint
        ];
      };
    };
}
