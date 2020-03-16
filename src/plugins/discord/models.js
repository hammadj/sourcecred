// @flow

// https://discordapp.com/developers/docs/reference#snowflakes
export type Snowflake = string;
export const ZeroSnowflake: Snowflake = "0";

export type BotToken = string;

/**
 * Discord Channels can be of various types, defined below.
 * See: https://discordapp.com/developers/docs/resources/channel#channel-object-channel-types
 *
 */
export type ChannelType =
  | "GUILD_TEXT"
  | "DM"
  | "GUILD_VOICE"
  | "GROUP_DM"
  | "GUILD_CATEGORY"
  | "GUILD_NEWS"
  | "GUILD_STORE";

/**
 * The Discord server returns an Id field of type number to represent
 * the type of Channel. Here we convert that to a text representation,
 * also based on: https://discordapp.com/developers/docs/resources/channel#channel-object-channel-types
 *
 */
export function channelTypeFromId(id: number): ChannelType {
  switch (id) {
    case 0:
      return "GUILD_TEXT";
    case 1:
      return "DM";
    case 2:
      return "GUILD_VOICE";
    case 3:
      return "GROUP_DM";
    case 4:
      return "GUILD_CATEGORY";
    case 5:
      return "GUILD_NEWS";
    case 6:
      return "GUILD_STORE";
    default: {
      throw new Error(`Unknown channel type ID: ${id}`);
    }
  }
}

export type Guild = {|
  +id: Snowflake,
  +name: string,
  +permissions: number,
|};

export type Channel = {|
  +id: Snowflake,
  +type: ChannelType,
  +name: string,
|};

export type User = {|
  +id: Snowflake,
  +username: string,
  +discriminator: string,
  +bot: boolean,
|};

export type GuildMember = {|
  +user: User,
  +nick: string | null,
  +roles: $ReadOnlyArray<Snowflake>,
|};

export type Emoji = {|
  +id: ?Snowflake,
  +name: string,
|};

export type EmojiRef = string;

/**
 * Custom emoji returned from the Discord server are defined
 * by an `id` and `name` property. Generic emoji are defined by
 * a unicode name property only, with a null id property.
 * This function returns the appropriate reference based on this
 * generic vs custom distinction.
 */
export function emojiToRef({id, name}: Emoji): EmojiRef {
  // Built-in emoji, unicode names.
  if (!id) return name;

  // Custom emoji.
  return `${name}:${id}`;
}

// Determines whether the message was created by a webhook or a Discord User
export function isAuthoredByNonUser(rawMessage: {
  +webhook_id?: Snowflake,
}): boolean {
  return rawMessage.webhook_id != null || false;
}

export type Message = {|
  +id: Snowflake,
  +channelId: Snowflake,
  +authorId: Snowflake,
  // Could be a message from a webhook, meaning the authorId isn't a user.
  +nonUserAuthor: boolean,
  +timestampMs: number,
  +content: string,
  // Normally includes reaction counters, but we don't care about counters.
  // We could filter based on which types of emoji have been added though.
  +reactionEmoji: $ReadOnlyArray<Emoji>,
  // Snowflake of user IDs.
  +mentions: $ReadOnlyArray<Snowflake>,
|};

export type Reaction = {|
  +channelId: Snowflake,
  +messageId: Snowflake,
  +authorId: Snowflake,
  +emoji: Emoji,
|};
