export const idl: FriendTech = {
  address: "HfBinAjQVmUSKCmsCQ4BDYvBwCmgjcN8Pv2E9yY6yLsd",
  metadata: {
    name: "friendtech",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "buyKeys",
      discriminator: [24, 8, 156, 247, 54, 32, 202, 117],
      accounts: [
        {
          name: "buyer",
          writable: true,
          signer: true,
        },
        {
          name: "creatorAccount",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  99, 114, 101, 97, 116, 111, 114, 95, 97, 99, 99, 111, 117,
                  110, 116,
                ],
              },
              {
                kind: "account",
                path: "creator_account.creator",
                account: "creatorAccount",
              },
            ],
          },
        },
        {
          name: "vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "creatorAccount",
              },
            ],
          },
        },
        {
          name: "key",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [107, 101, 121],
              },
              {
                kind: "account",
                path: "creatorAccount",
              },
            ],
          },
        },
        {
          name: "buyerKeyAta",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "buyer",
              },
              {
                kind: "account",
                path: "tokenProgram",
              },
              {
                kind: "account",
                path: "key",
              },
            ],
            program: {
              kind: "const",
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: "associatedTokenProgram",
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "initialize",
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: "creator",
          writable: true,
          signer: true,
        },
        {
          name: "creatorAccount",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  99, 114, 101, 97, 116, 111, 114, 95, 97, 99, 99, 111, 117,
                  110, 116,
                ],
              },
              {
                kind: "account",
                path: "creator",
              },
            ],
          },
        },
        {
          name: "key",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [107, 101, 121],
              },
              {
                kind: "account",
                path: "creatorAccount",
              },
            ],
          },
        },
        {
          name: "keyMetadata",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [109, 101, 116, 97, 100, 97, 116, 97],
              },
              {
                kind: "account",
                path: "tokenMetadataProgram",
              },
              {
                kind: "account",
                path: "key",
              },
            ],
            program: {
              kind: "account",
              path: "tokenMetadataProgram",
            },
          },
        },
        {
          name: "vault",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "creatorAccount",
              },
            ],
          },
        },
        {
          name: "tokenMetadataProgram",
          address: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
        {
          name: "rent",
          address: "SysvarRent111111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "uri",
          type: "string",
        },
        {
          name: "basePrice",
          type: "u64",
        },
        {
          name: "slope",
          type: "u64",
        },
        {
          name: "fee",
          type: "u8",
        },
      ],
    },
    {
      name: "sellKeys",
      discriminator: [211, 221, 116, 16, 58, 49, 1, 247],
      accounts: [
        {
          name: "seller",
          writable: true,
          signer: true,
        },
        {
          name: "creatorAccount",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  99, 114, 101, 97, 116, 111, 114, 95, 97, 99, 99, 111, 117,
                  110, 116,
                ],
              },
              {
                kind: "account",
                path: "creator_account.creator",
                account: "creatorAccount",
              },
            ],
          },
        },
        {
          name: "vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "creatorAccount",
              },
            ],
          },
        },
        {
          name: "key",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [107, 101, 121],
              },
              {
                kind: "account",
                path: "creatorAccount",
              },
            ],
          },
        },
        {
          name: "sellerKeyAta",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "seller",
              },
              {
                kind: "account",
                path: "tokenProgram",
              },
              {
                kind: "account",
                path: "key",
              },
            ],
            program: {
              kind: "const",
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: "associatedTokenProgram",
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "withdrawFee",
      discriminator: [14, 122, 231, 218, 31, 238, 223, 150],
      accounts: [
        {
          name: "creator",
          writable: true,
          signer: true,
          relations: ["creatorAccount"],
        },
        {
          name: "creatorAccount",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  99, 114, 101, 97, 116, 111, 114, 95, 97, 99, 99, 111, 117,
                  110, 116,
                ],
              },
              {
                kind: "account",
                path: "creator",
              },
            ],
          },
        },
        {
          name: "key",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [107, 101, 121],
              },
              {
                kind: "account",
                path: "creatorAccount",
              },
            ],
          },
        },
        {
          name: "vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "creatorAccount",
              },
            ],
          },
        },
        {
          name: "tokenProgram",
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
        {
          name: "rent",
          address: "SysvarRent111111111111111111111111111111111",
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "creatorAccount",
      discriminator: [222, 163, 32, 169, 204, 8, 200, 32],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "nameMaxLenReached",
      msg: "Name length limit is reached",
    },
    {
      code: 6001,
      name: "slopeLessThanZero",
      msg: "Slope should be greater than zero",
    },
    {
      code: 6002,
      name: "feeShouldBeLessThan100",
      msg: "Fee should be less than or equal to 100",
    },
  ],
  types: [
    {
      name: "creatorAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "creator",
            type: "pubkey",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "basePrice",
            type: "u64",
          },
          {
            name: "slope",
            type: "u64",
          },
          {
            name: "fee",
            type: "u8",
          },
          {
            name: "keyBump",
            type: "u8",
          },
          {
            name: "vaultBump",
            type: "u8",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
  constants: [
    {
      name: "seed",
      type: "string",
      value: '"anchor"',
    },
  ],
};

export type FriendTech = {
  address: "HfBinAjQVmUSKCmsCQ4BDYvBwCmgjcN8Pv2E9yY6yLsd";
  metadata: {
    name: "friendtech";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "buyKeys";
      discriminator: [24, 8, 156, 247, 54, 32, 202, 117];
      accounts: [
        {
          name: "buyer";
          writable: true;
          signer: true;
        },
        {
          name: "creatorAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
                  114,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ];
              },
              {
                kind: "account";
                path: "creator_account.creator";
                account: "creatorAccount";
              }
            ];
          };
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "creatorAccount";
              }
            ];
          };
        },
        {
          name: "key";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [107, 101, 121];
              },
              {
                kind: "account";
                path: "creatorAccount";
              }
            ];
          };
        },
        {
          name: "buyerKeyAta";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "buyer";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "key";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "creator";
          writable: true;
          signer: true;
        },
        {
          name: "creatorAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
                  114,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ];
              },
              {
                kind: "account";
                path: "creator";
              }
            ];
          };
        },
        {
          name: "key";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [107, 101, 121];
              },
              {
                kind: "account";
                path: "creatorAccount";
              }
            ];
          };
        },
        {
          name: "keyMetadata";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 101, 116, 97, 100, 97, 116, 97];
              },
              {
                kind: "account";
                path: "tokenMetadataProgram";
              },
              {
                kind: "account";
                path: "key";
              }
            ];
            program: {
              kind: "account";
              path: "tokenMetadataProgram";
            };
          };
        },
        {
          name: "vault";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "creatorAccount";
              }
            ];
          };
        },
        {
          name: "tokenMetadataProgram";
          address: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "uri";
          type: "string";
        },
        {
          name: "basePrice";
          type: "u64";
        },
        {
          name: "slope";
          type: "u64";
        },
        {
          name: "fee";
          type: "u8";
        }
      ];
    },
    {
      name: "sellKeys";
      discriminator: [211, 221, 116, 16, 58, 49, 1, 247];
      accounts: [
        {
          name: "seller";
          writable: true;
          signer: true;
        },
        {
          name: "creatorAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
                  114,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ];
              },
              {
                kind: "account";
                path: "creator_account.creator";
                account: "creatorAccount";
              }
            ];
          };
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "creatorAccount";
              }
            ];
          };
        },
        {
          name: "key";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [107, 101, 121];
              },
              {
                kind: "account";
                path: "creatorAccount";
              }
            ];
          };
        },
        {
          name: "sellerKeyAta";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "seller";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "key";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "withdrawFee";
      discriminator: [14, 122, 231, 218, 31, 238, 223, 150];
      accounts: [
        {
          name: "creator";
          writable: true;
          signer: true;
          relations: ["creatorAccount"];
        },
        {
          name: "creatorAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
                  114,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ];
              },
              {
                kind: "account";
                path: "creator";
              }
            ];
          };
        },
        {
          name: "key";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [107, 101, 121];
              },
              {
                kind: "account";
                path: "creatorAccount";
              }
            ];
          };
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "creatorAccount";
              }
            ];
          };
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "creatorAccount";
      discriminator: [222, 163, 32, 169, 204, 8, 200, 32];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "nameMaxLenReached";
      msg: "Name length limit is reached";
    },
    {
      code: 6001;
      name: "slopeLessThanZero";
      msg: "Slope should be greater than zero";
    },
    {
      code: 6002;
      name: "feeShouldBeLessThan100";
      msg: "Fee should be less than or equal to 100";
    }
  ];
  types: [
    {
      name: "creatorAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "creator";
            type: "pubkey";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "basePrice";
            type: "u64";
          },
          {
            name: "slope";
            type: "u64";
          },
          {
            name: "fee";
            type: "u8";
          },
          {
            name: "keyBump";
            type: "u8";
          },
          {
            name: "vaultBump";
            type: "u8";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    }
  ];
  constants: [
    {
      name: "seed";
      type: "string";
      value: '"anchor"';
    }
  ];
};
