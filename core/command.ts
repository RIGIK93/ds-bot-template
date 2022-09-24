import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandsOnlyBuilder, CommandInteractionOptionResolver, RESTPostAPIApplicationCommandsJSONBody, APIApplicationCommandSubcommandOption } from "discord.js"

// export interface ICommand {
//     builder: SlashCommandBuilder
//     command: (interaction: ChatInputCommandInteraction<CacheType>) => void
// }

// export function createCommand(blueprint: ICommand): Command {
//     const cmd = new Command()
//     cmd.onCommand(blueprint.command)
//     cmd.build(blueprint.builder)
//     return cmd
// }

export interface ICommand {
    builder: SubBuilder | SlashCommandBuilder
    action: (interaction: ChatInputCommandInteraction<CacheType>, options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">) => void
    name: string
    JSON(): RESTPostAPIApplicationCommandsJSONBody | APIApplicationCommandSubcommandOption
    build(builder: SubBuilder | SlashCommandBuilder): SubBuilder | SlashCommandBuilder
}

export class Command implements ICommand{

    public JSON() {
        return this.builder.toJSON()
    }

    public get name() {
        return this.builder.name
    }

    public set name(val: string) {
        this.builder.setName(val)
    }

    public onCommand(action: (interaction: ChatInputCommandInteraction<CacheType>, options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">) => void) {
        this._action = action
    }

    public build(func: (builder: SlashCommandBuilder) => SlashCommandBuilder);
    public build(builder: SlashCommandBuilder);
    public build(param: SlashCommandBuilder | ((builder: SlashCommandBuilder) => SlashCommandBuilder)) {
        if (param instanceof Function) {
            this._builder = param(new SlashCommandBuilder())
            return
        }
        this._builder = param
    }

    public get action() {
        return this._action ? this._action : ()=>{}
    }

    private _action: (interaction: ChatInputCommandInteraction<CacheType>, options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">)=>void

    private _builder: SlashCommandBuilder

    public get builder() {
        return this._builder
    }
}

// --------------------------------------------------------

export type SubBuilder = SlashCommandSubcommandBuilder | SlashCommandSubcommandsOnlyBuilder

export class SubCommand implements ICommand {
    public JSON() {
        return this.builder.toJSON()
    }

    public get name() {
        return this.builder.name
    }

    public set name(val: string) {
        this.builder.setName(val)
    }

    public onCommand(action: (interaction: ChatInputCommandInteraction<CacheType>, options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">) => void) {
        this._action = action
    }

    public build(func: (builder: SlashCommandSubcommandBuilder) => SubBuilder);
    public build(builder: SubBuilder);
    public build(param: SubBuilder | ((builder: SubBuilder) => SubBuilder)) {
        if (param instanceof Function) {
            this._builder = param(new SlashCommandSubcommandBuilder())
            return
        }
        this._builder = param
    }


    public get action() {
        return this._action ? this._action : () => {}
    }

    private _action: (interaction: ChatInputCommandInteraction<CacheType>, options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">)=>void

    private _builder: SubBuilder

    public get builder() {
        return this._builder
    }
}

